import { NextRequest, NextResponse } from "next/server";
import { fishFetch, fishAuthHeaders, mapFishModel, FishModel } from "@/lib/fish";
import { requireUser } from "@/lib/supabaseServer";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  try {
    const { user, error: authError } = await requireUser();
    if (!user) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    if (!rateLimit(`search:${user.id}`, 40, 60 * 1000) || !rateLimit(`search:${clientIp(req)}`, 60, 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

    const params = new URLSearchParams({
      page_size: "24",
      page_number: String(page),
      sort_by: "score",
    });
    if (q) params.set("title", q);

    const res = await fishFetch(`/model?${params.toString()}`, {
      headers: fishAuthHeaders(),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[voice-clone/search] Fish Audio error:", detail);
      return NextResponse.json({ error: "Voice search failed." }, { status: 502 });
    }

    const data = await res.json();
    const items = ((data.items || []) as FishModel[])
      .filter((m) => m.visibility === "public")
      .map(mapFishModel);

    return NextResponse.json({
      items,
      total: data.total ?? items.length,
      hasMore: Boolean(data.has_more),
    });
  } catch (error) {
    console.error("[voice-clone/search] error:", error);
    return NextResponse.json({ error: "Voice search failed." }, { status: 500 });
  }
}
