import { NextRequest, NextResponse } from "next/server";
import { fishFetch, fishAuthHeaders } from "@/lib/fish";
import { requireUser } from "@/lib/supabaseServer";

// Matches Fish Audio model IDs (32 hex chars) so this can't be used to poke
// arbitrary upstream paths.
const ID_PATTERN = /^[a-f0-9]{32}$/i;

export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await requireUser();
    if (!user) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    const { id } = await req.json();
    if (typeof id !== "string" || !ID_PATTERN.test(id)) {
      return NextResponse.json({ error: "Invalid voice id." }, { status: 400 });
    }

    const res = await fishFetch(`/model/${id}`, {
      method: "DELETE",
      headers: fishAuthHeaders(),
    });

    if (!res.ok && res.status !== 404) {
      const detail = await res.text();
      console.error("[voice-clone/delete] Fish Audio error:", detail);
      return NextResponse.json({ error: "Could not delete this voice." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[voice-clone/delete] error:", error);
    return NextResponse.json({ error: "Could not delete this voice." }, { status: 500 });
  }
}
