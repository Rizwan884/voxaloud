import { NextRequest, NextResponse } from "next/server";
import { fishFetch, fishAuthHeaders, FISH_MODEL, CLONE_CHAR_LIMIT } from "@/lib/fish";
import { rateLimit, clientIp } from "@/lib/rateLimit";
import { requireUser } from "@/lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await requireUser();
    if (!user) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    if (!rateLimit(`generate:${user.id}`, 20, 10 * 60 * 1000) || !rateLimit(`generate:${clientIp(req)}`, 30, 10 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
    }

    const body = await req.json();
    const { text, referenceId, speed } = body as { text?: string; referenceId?: string; speed?: number };

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }
    if (text.length > CLONE_CHAR_LIMIT) {
      return NextResponse.json({ error: `Text exceeds the ${CLONE_CHAR_LIMIT} character limit.` }, { status: 400 });
    }
    if (!referenceId) {
      return NextResponse.json({ error: "No voice selected." }, { status: 400 });
    }

    const safeSpeed = typeof speed === "number" && speed >= 0.5 && speed <= 2 ? speed : 1.0;

    const ttsRes = await fishFetch("/v1/tts", {
      method: "POST",
      headers: fishAuthHeaders({
        "Content-Type": "application/json",
        model: FISH_MODEL,
      }),
      body: JSON.stringify({
        text: text.trim(),
        reference_id: referenceId,
        format: "mp3",
        normalize: true,
        latency: "normal",
        temperature: 0.7,
        top_p: 0.7,
        repetition_penalty: 1.2,
        sample_rate: 44100,
        prosody: { speed: safeSpeed, volume: 0 },
        model: FISH_MODEL,
      }),
    });

    if (!ttsRes.ok) {
      const detail = await ttsRes.text();
      console.error("[voice-clone/generate] Fish Audio error:", detail);
      const message = ttsRes.status === 400 && detail.includes("Reference not found")
        ? "That voice is no longer available. Please choose another voice."
        : "Speech generation failed. Please try again.";
      return NextResponse.json({ error: message }, { status: ttsRes.status === 400 ? 400 : 502 });
    }

    const audioBuffer = await ttsRes.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[voice-clone/generate] error:", error);
    return NextResponse.json({ error: "Speech generation failed." }, { status: 500 });
  }
}
