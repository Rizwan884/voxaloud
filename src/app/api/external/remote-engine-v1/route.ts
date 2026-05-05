import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import path from "path";

/**
 * OBSCURED PROXY FOR EXTERNAL SERVICES
 * 
 * Path: /api/external/remote-engine-v1
 * Version: 1.0.1 (Triggering Redeploy)
 */

const REMOTE_URL = "https://api.fish.audio/v1";

export async function GET() {
  return NextResponse.json({ 
    status: "alive", 
    message: "Use POST with correct headers/body to access the engine.",
    config_check: {
      has_api_key: !!process.env.FISH_AUDIO_API_KEY,
      has_secret: !!process.env.APP_INTERNAL_SECRET,
      has_app_id: !!process.env.ALLOWED_APP_ID
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Security Check: Obscured Header
    const gatewayKey = req.headers.get("X-Gateway-Key");
    if (gatewayKey !== process.env.APP_INTERNAL_SECRET) {
      return NextResponse.json({ error: "Access Denied: 401" }, { status: 401 });
    }

    const body = await req.json();
    const { op, client_ref, ...data } = body;

    // 2. Security Check: Reference check
    if (client_ref !== process.env.ALLOWED_APP_ID) {
      return NextResponse.json({ error: "Access Denied: 403" }, { status: 403 });
    }

    const auth = process.env.FISH_AUDIO_API_KEY;
    if (!auth) {
      return NextResponse.json({ error: "Config Error" }, { status: 500 });
    }

    // Helper for forwarding requests to Fish Audio
    const forwardRequest = async (path: string, options: RequestInit = {}) => {
      const url = `https://api.fish.audio${path}`;
      const res = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${auth}`,
          ...options.headers,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `External API returned ${res.status}`);
      }

      return res;
    };

    switch (op) {
      case "process_task": // TTS
        const ttsRes = await forwardRequest('/v1/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        const audioBuffer = await ttsRes.arrayBuffer();
        return new NextResponse(audioBuffer, {
          headers: { 
            'Content-Type': 'audio/mpeg',
            'X-Resource-ID': 'stream-audio'
          }
        });

      case "retrieve_catalog":
        const catRes = await forwardRequest('/model', { method: 'GET' });
        const catData = await catRes.json();
        return NextResponse.json(catData);

      case "examine_asset":
        if (!data.asset_id) return NextResponse.json({ error: "Missing asset_id" }, { status: 400 });
        const assetRes = await forwardRequest(`/model/${data.asset_id}`, { method: 'GET' });
        const assetData = await assetRes.json();
        return NextResponse.json(assetData);

      case "commit_new_entry":
        const createRes = await forwardRequest('/model', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const createData = await createRes.json();
        return NextResponse.json(createData);

      case "purge_entry":
        if (!data.asset_id) return NextResponse.json({ error: "Missing asset_id" }, { status: 400 });
        const delRes = await forwardRequest(`/model/${data.asset_id}`, { method: 'DELETE' });
        const delData = await delRes.json();
        return NextResponse.json(delData);

      case "fetch_ai_voices": {
        const jsonPath = path.join(process.cwd(), 'updated_data_1778009267572.json');
        if (!fs.existsSync(jsonPath)) return NextResponse.json({ error: "Data file not found" }, { status: 500 });
        const allVoices = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        const aiVoices = allVoices.filter((v: any) => v.category === "AI Voice");
        return NextResponse.json(aiVoices);
      }

      case "fetch_celebrity_voices": {
        const jsonPath = path.join(process.cwd(), 'updated_data_1778009267572.json');
        if (!fs.existsSync(jsonPath)) return NextResponse.json({ error: "Data file not found" }, { status: 500 });
        const allVoices = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        const celebrityVoices = allVoices.filter((v: any) => v.category !== "AI Voice");
        return NextResponse.json(celebrityVoices);
      }

      default:
        return NextResponse.json({ error: "Invalid Op" }, { status: 400 });
    }

  } catch (error: any) {
    console.error("Engine Error:", error.message);
    return NextResponse.json(
      { 
        error: "Engine execution failed", 
        detail: error.message 
      },
      { status: 500 }
    );
  }
}
