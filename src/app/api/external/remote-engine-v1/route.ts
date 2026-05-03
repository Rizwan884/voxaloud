import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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

    const headers = {
      'Authorization': `Bearer ${auth}`,
      'Content-Type': 'application/json',
    };

    switch (op) {
      case "process_task": // Formerly 'tts'
        const ttsRes = await axios.post(`${REMOTE_URL}/tts`, data, {
          headers,
          responseType: 'arraybuffer'
        });
        
        return new NextResponse(ttsRes.data, {
          headers: { 
            'Content-Type': 'audio/mpeg',
            'X-Resource-ID': 'stream-audio'
          }
        });

      case "retrieve_catalog": // Formerly 'list_voices'
        // Fish Audio uses /v1/model for listing voices
        const catRes = await axios.get(`${REMOTE_URL}/model`, { headers });
        return NextResponse.json(catRes.data);

      case "examine_asset": // Formerly 'get_voice'
        if (!data.asset_id) return NextResponse.json({ error: "Missing asset_id" }, { status: 400 });
        const assetRes = await axios.get(`${REMOTE_URL}/model/${data.asset_id}`, { headers });
        return NextResponse.json(assetRes.data);

      case "commit_new_entry": // Formerly 'create_voice'
        // Fish Audio uses /v1/model for creation
        const createRes = await axios.post(`${REMOTE_URL}/model`, data, { headers });
        return NextResponse.json(createRes.data);

      case "purge_entry": // Formerly 'delete_voice'
        if (!data.asset_id) return NextResponse.json({ error: "Missing asset_id" }, { status: 400 });
        const delRes = await axios.delete(`${REMOTE_URL}/model/${data.asset_id}`, { headers });
        return NextResponse.json(delRes.data);

      default:
        return NextResponse.json({ error: "Invalid Op" }, { status: 400 });
    }

  } catch (error: any) {
    const status = error.response?.status || 500;
    const errorDetail = error.response?.data || error.message;
    console.error("Engine Error:", errorDetail);
    
    return NextResponse.json(
      { 
        error: "Engine execution failed", 
        detail: errorDetail 
      },
      { status }
    );
  }
}
