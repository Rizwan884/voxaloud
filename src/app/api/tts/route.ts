import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TTS_API_URL = "https://speechma.com/com.api/tts-api.php";

export async function POST(req: NextRequest) {
  try {
    const { text, voice, pitch, rate } = await req.json();

    if (!text || text.length > 4000) {
      return NextResponse.json({ error: "Invalid text length. Limit is 4000 characters." }, { status: 400 });
    }

    // Split text into chunks (1700-1950 chars)
    const chunks: string[] = [];
    let remainingText = text;

    while (remainingText.length > 0) {
      if (remainingText.length <= 1950) {
        chunks.push(remainingText);
        break;
      }
      
      // Random chunk size between 1700 and 1950
      const chunkSize = Math.floor(Math.random() * (1950 - 1700 + 1)) + 1700;
      
      // Try to split at a sentence or word boundary if possible within the chunk
      let actualSplit = chunkSize;
      const lastPeriod = remainingText.lastIndexOf(". ", chunkSize);
      const lastSpace = remainingText.lastIndexOf(" ", chunkSize);
      
      if (lastPeriod > 1600) {
        actualSplit = lastPeriod + 1;
      } else if (lastSpace > 1600) {
        actualSplit = lastSpace;
      }

      chunks.push(remainingText.substring(0, actualSplit).trim());
      remainingText = remainingText.substring(actualSplit).trim();
    }

    const audioChunks: Buffer[] = [];

    // Process chunks sequentially to keep order
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
        responseType: 'arraybuffer' // Expect audio data
      });

      audioChunks.push(Buffer.from(response.data));
    }

    // Merge chunks
    const mergedAudio = Buffer.concat(audioChunks);

    return new NextResponse(mergedAudio, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

  } catch (error: any) {
    console.error("TTS processing error:", error.message);
    return NextResponse.json({ error: "Failed to synthesize speech" }, { status: 500 });
  }
}
