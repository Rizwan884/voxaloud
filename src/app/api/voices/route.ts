import { NextResponse } from "next/server";
import axios from "axios";
import { formatStream } from "@/lib/stream";

const VOICES_URL = "https://raw.githubusercontent.com/jr270504/tsda/refs/heads/main/voices.json";

export async function GET() {
  try {
    const response = await axios.get(VOICES_URL);
    const voices = (response.data as Array<Record<string, unknown>>).map((v) => ({
      ...v,
      previewAudioPath: formatStream(v.previewAudioPath as string)
    }));
    const encrypted = formatStream(JSON.stringify(voices));
    return NextResponse.json({ _data: encrypted });
  } catch (error) {
    console.error("Error fetching voices:", error);
    return NextResponse.json({ error: "Failed to fetch voices" }, { status: 500 });
  }
}
