import { NextRequest, NextResponse } from "next/server";
import { fishFetch, fishAuthHeaders } from "@/lib/fish";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { requireUser } from "@/lib/supabaseServer";

const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB
const MIN_FILE_BYTES = 8 * 1024; // guard against empty/near-empty recordings

export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await requireUser();
    if (!user) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    if (!rateLimit(`clone:${user.id}`, 6, 10 * 60 * 1000) || !rateLimit(`clone:${clientIp(req)}`, 10, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many clone attempts. Please wait a few minutes and try again." }, { status: 429 });
    }

    const formData = await req.formData();
    const title = (formData.get("title") as string) || "My Cloned Voice";
    const audio = formData.get("audio") as File | null;

    if (!audio || !(audio instanceof File)) {
      return NextResponse.json({ error: "No audio sample provided." }, { status: 400 });
    }
    if (audio.size < MIN_FILE_BYTES) {
      return NextResponse.json({ error: "Recording is too short. Please provide at least a few seconds of clear speech." }, { status: 400 });
    }
    if (audio.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "Audio file is too large (20MB max)." }, { status: 400 });
    }

    const upstreamForm = new FormData();
    upstreamForm.append("title", title.slice(0, 80));
    upstreamForm.append("visibility", "private");
    upstreamForm.append("type", "tts");
    upstreamForm.append("train_mode", "fast");
    upstreamForm.append("enhance_audio_quality", "true");
    upstreamForm.append("voices", audio, audio.name || "sample.wav");

    const cloneRes = await fishFetch("/model", {
      method: "POST",
      headers: fishAuthHeaders(),
      body: upstreamForm,
    });

    if (!cloneRes.ok) {
      const detail = await cloneRes.text();
      console.error("[voice-clone/create] Fish Audio error:", detail);
      return NextResponse.json({ error: "Voice cloning failed. Please try a clearer recording." }, { status: 502 });
    }

    const data = await cloneRes.json();
    return NextResponse.json({
      id: data._id,
      title: data.title,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("[voice-clone/create] error:", error);
    return NextResponse.json({ error: "Voice cloning failed." }, { status: 500 });
  }
}
