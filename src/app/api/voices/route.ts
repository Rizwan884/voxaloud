import { NextResponse } from "next/server";
import axios from "axios";
import { formatStream } from "@/lib/stream";
import fs from 'fs';
import path from 'path';

const VOICES_URL = "https://raw.githubusercontent.com/rizwan884/tsda/refs/heads/main/voices.json";

export async function GET() {
  try {
    let rawData;
    const localPath = path.join(process.cwd(), 'voices_updated.json');

    if (fs.existsSync(localPath)) {
      rawData = JSON.parse(fs.readFileSync(localPath, 'utf8'));
    } else {
      const response = await axios.get(VOICES_URL);
      rawData = response.data;
    }

    const voices = (rawData as Array<Record<string, any>>).map((v) => {
      const { previewAudioPath, ...rest } = v;
      return rest;
    });
    const encrypted = formatStream(JSON.stringify(voices));
    return NextResponse.json({ _data: encrypted });
  } catch (error) {
    console.error("Error fetching voices:", error);
    return NextResponse.json({ error: "Failed to fetch voices" }, { status: 500 });
  }
}
