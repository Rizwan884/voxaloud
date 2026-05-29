import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { formatStream, parseStream } from "@/lib/stream";

const TTS_API_URL = "https://speechma.com/com.api/tts-api.php";

export async function POST(req: NextRequest) {
  try {
    const { _payload } = await req.json();
    if (!_payload) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const decrypted = parseStream(_payload, true) as string;
    const { text, voice, pitch, rate } = JSON.parse(decrypted);

    if (!text || text.length > 10000) {
      return NextResponse.json({ error: "Invalid text length. Limit is 10000 characters." }, { status: 400 });
    }

    // Split text into chunks (1700-1950 chars)
    const chunks: string[] = [];
    let remainingText = text;

    while (remainingText.length > 0) {
      if (remainingText.length <= 1950) {
        chunks.push(remainingText);
        break;
      }

      const chunkSize = Math.floor(Math.random() * (1950 - 1700 + 1)) + 1700;
      let actualSplit = chunkSize;
      const lastPeriod = remainingText.lastIndexOf(". ", chunkSize);
      const lastSpace = remainingText.lastIndexOf(" ", chunkSize);

      if (lastPeriod > 1600) actualSplit = lastPeriod + 1;
      else if (lastSpace > 1600) actualSplit = lastSpace;

      chunks.push(remainingText.substring(0, actualSplit).trim());
      remainingText = remainingText.substring(actualSplit).trim();
    }

    const audioChunks: Buffer[] = [];

    // Process chunks sequentially
    for (const chunk of chunks) {
      const payload = {
        text: chunk,
        voice: voice || 'voice-85',
        pitch: pitch ?? 0,
        rate: rate ?? 0
      };

      const response = await axios.post(TTS_API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        responseType: 'arraybuffer'
      });

      audioChunks.push(Buffer.from(response.data));
    }

    // Merge chunks
    const mergedAudio = Buffer.concat(audioChunks);

    // Obfuscate the audio buffer to hide it from the network tab
    const encrypted = formatStream(mergedAudio);

    return NextResponse.json({ _data: encrypted });

  } catch (error: unknown) {
    console.error("TTS processing error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Failed to synthesize speech" }, { status: 500 });
  }
}
