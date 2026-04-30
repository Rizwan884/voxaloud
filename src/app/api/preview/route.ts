import { NextResponse } from "next/server";
import axios from "axios";
import fs from 'fs';
import path from 'path';

const VOICES_URL = "https://raw.githubusercontent.com/Mob884/tsda/refs/heads/main/voices.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return new Response("Missing ID", { status: 400 });

  try {
    let voices;
    const localPath = path.join(process.cwd(), 'voices_updated.json');

    if (fs.existsSync(localPath)) {
      voices = JSON.parse(fs.readFileSync(localPath, 'utf8'));
    } else {
      const response = await axios.get(VOICES_URL);
      voices = response.data;
    }

    const voice = voices.find((v: any) => v.id === id);
    if (!voice || !voice.previewAudioPath) {
      return new Response("Voice not found", { status: 404 });
    }

    // Fetch the actual audio from the remote source
    const audioResponse = await axios.get(voice.previewAudioPath, {
      responseType: 'arraybuffer'
    });

    return new Response(audioResponse.data, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
      }
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response("Error fetching audio", { status: 500 });
  }
}
