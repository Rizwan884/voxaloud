import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * VOXALOUD REMOTE ENGINE GATEWAY (V1)
 * 
 * This bridge provides secure access to Fish Audio services for the Flutter application.
 * It handles authentication, parameter mapping, and local data retrieval.
 */

const FISH_API_ROOT = "https://api.fish.audio";

// Simple cache for voice data to avoid repeated disk reads
let cachedVoices: any[] | null = null;
let lastCacheUpdate = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

const getVoicesData = () => {
  const now = Date.now();
  if (cachedVoices && (now - lastCacheUpdate < CACHE_TTL)) {
    return cachedVoices;
  }

  try {
    const jsonPath = path.join(process.cwd(), 'updated_data_1778009267572.json');
    if (!fs.existsSync(jsonPath)) {
      console.error("Data file missing:", jsonPath);
      return null;
    }
    const data = fs.readFileSync(jsonPath, 'utf-8');
    cachedVoices = JSON.parse(data);
    lastCacheUpdate = now;
    return cachedVoices;
  } catch (error) {
    console.error("Error loading voice data:", error);
    return null;
  }
};



export async function GET() {
  return NextResponse.json({ 
    status: "online", 
    version: "1.2.1",
    service: "Voxaloud Engine Bridge",
    health_check: {
      api_key_configured: !!process.env.FISH_AUDIO_API_KEY,
      gateway_secret_set: !!process.env.APP_INTERNAL_SECRET,
      app_id_configured: !!process.env.ALLOWED_APP_ID,
      data_source_valid: fs.existsSync(path.join(process.cwd(), 'updated_data_1778009267572.json'))
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication Check (X-Gateway-Key)
    const gatewayKey = req.headers.get("X-Gateway-Key");
    if (!gatewayKey || gatewayKey !== process.env.APP_INTERNAL_SECRET) {
      console.warn("Unauthorized access attempt: Invalid Gateway Key");
      return NextResponse.json({ error: "Unauthorized: Invalid Security Header" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";
    let op: string | null = null;
    let client_ref: string | null = null;
    let data: any = {};
    let files: File[] = [];

    // 2. Parse Request Body based on Content-Type
    if (contentType.includes("application/json")) {
      const body = await req.json();
      op = body.op;
      client_ref = body.client_ref;
      data = body;
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      op = formData.get("op") as string;
      client_ref = formData.get("client_ref") as string;
      
      // Extract all uploaded files (expected key: 'audio' or 'files')
      const uploadedFiles = formData.getAll("audio").concat(formData.getAll("files")) as File[];
      files = uploadedFiles.filter(f => f instanceof File);
      
      // Extract other form fields into data
      formData.forEach((value, key) => {
        if (key !== "audio" && key !== "files" && key !== "op" && key !== "client_ref") {
          data[key] = value;
        }
      });
    }

    console.log(`[Engine] Operation: ${op}, Client: ${client_ref}`);

    // 3. Security Checks
    if (!op) return NextResponse.json({ error: "Missing operation (op)" }, { status: 400 });
    if (!client_ref || client_ref !== process.env.ALLOWED_APP_ID) {
      console.warn(`Forbidden access attempt: Invalid client_ref (${client_ref})`);
      return NextResponse.json({ error: "Forbidden: Invalid Client Reference" }, { status: 403 });
    }

    const apiKey = process.env.FISH_AUDIO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server Configuration Error: API Key missing" }, { status: 500 });
    }

    // Helper for Fish Audio Requests (JSON)
    const fishJsonFetch = async (endpoint: string, options: RequestInit = {}) => {
      const url = `${FISH_API_ROOT}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Fish Audio API Error (${response.status}): ${errorDetail}`);
      }

      return response;
    };

    // 4. Operation Routing
    switch (op) {
      case "fetch_ai_voices": {
        const voices = getVoicesData();
        if (!voices) return NextResponse.json({ error: "Data file missing or corrupt" }, { status: 500 });
        const aiVoices = voices.filter((v: any) => v.category === "AI Voice");
        return NextResponse.json(aiVoices);
      }

      case "fetch_celebrity_voices": {
        const voices = getVoicesData();
        if (!voices) return NextResponse.json({ error: "Data file missing or corrupt" }, { status: 500 });
        const celebrityVoices = voices.filter((v: any) => v.category !== "AI Voice");
        return NextResponse.json(celebrityVoices);
      }

      case "process_task": {
        const ttsPayload = {
          text: data.text,
          reference_id: data.voice_id,
          format: data.format || "mp3",
          normalize: true,
          latency: "normal",
          temperature: parseFloat(data.temperature || "0.7"),
          top_p: parseFloat(data.top_p || "0.9"),
          prosody: {
            speed: parseFloat(data.speed || "1.0"),
            volume: parseFloat(data.volume || "0.0"),
          }
        };

        if (!ttsPayload.text || !ttsPayload.reference_id) {
          return NextResponse.json({ error: "Missing required fields: text or voice_id" }, { status: 400 });
        }

        const ttsRes = await fishJsonFetch('/v1/tts', {
          method: 'POST',
          headers: { 'model': 's2-pro' },
          body: JSON.stringify(ttsPayload),
        });
        
        const audioBuffer = await ttsRes.arrayBuffer();
        return new NextResponse(audioBuffer, {
          headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-cache' }
        });
      }

      case "merge_audio_segments": {
        const buffers: Buffer[] = [];

        // Support for Multipart (Direct File Upload)
        if (files.length > 0) {
          for (const file of files) {
            buffers.push(Buffer.from(await file.arrayBuffer()));
          }
        } 
        // Support for JSON (URLs)
        else if (data.urls && Array.isArray(data.urls)) {
          for (const url of data.urls) {
            try {
              const res = await fetch(url);
              if (res.ok) buffers.push(Buffer.from(await res.arrayBuffer()));
            } catch (err) {
              console.error(`Failed to download segment: ${url}`, err);
            }
          }
        }

        if (buffers.length === 0) {
          return NextResponse.json({ error: "No valid audio segments provided (upload files or send URLs)" }, { status: 400 });
        }

        const mergedBuffer = Buffer.concat(buffers);
        return new NextResponse(mergedBuffer, {
          headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-cache' }
        });
      }

      case "commit_new_entry": {
        // Voice Cloning (Multipart Upload)
        if (!data.title || !data.voices || !Array.isArray(data.voices)) {
          return NextResponse.json({ error: "Missing required fields: title or voices (array)" }, { status: 400 });
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("visibility", "private");
        formData.append("type", "tts");
        formData.append("train_mode", "fast");

        for (let i = 0; i < data.voices.length; i++) {
          const url = data.voices[i];
          const voiceRes = await fetch(url);
          if (!voiceRes.ok) throw new Error(`Failed to download voice sample ${i + 1} from ${url}`);
          const buffer = await voiceRes.arrayBuffer();
          const blob = new Blob([buffer], { type: 'audio/mpeg' });
          formData.append("voices", blob, `sample_${i}.mp3`);
        }

        const cloneRes = await fetch(`${FISH_API_ROOT}/model`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}` },
          body: formData,
        });

        if (!cloneRes.ok) {
          const errText = await cloneRes.text();
          throw new Error(`Fish Audio Clone Error (${cloneRes.status}): ${errText}`);
        }

        const cloneData = await cloneRes.json();
        return NextResponse.json(cloneData);
      }

      default:
        return NextResponse.json({ error: `Unknown operation: ${op}` }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Engine Runtime Error:", error.message);
    return NextResponse.json(
      { error: "Internal Processing Failed", detail: error.message },
      { status: 500 }
    );
  }
}
