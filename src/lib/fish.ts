// Server-only helper for the real Fish Audio API (voice cloning + TTS).
// Never import this from a client component — it reads process.env.FISH_AUDIO_API_KEY.

const FISH_API_ROOT = "https://api.fish.audio";

// Free-tier engine: high quality, zero credit cost on this account.
export const FISH_MODEL = "s2.1-pro-free";

// Hard cap enforced both client and server side for the clone studio.
export const CLONE_CHAR_LIMIT = 1000;

export function getFishApiKey(): string {
  const key = process.env.FISH_AUDIO_API_KEY;
  if (!key) throw new Error("FISH_AUDIO_API_KEY is not configured");
  return key;
}

export function fishAuthHeaders(extra?: Record<string, string>) {
  return {
    Authorization: `Bearer ${getFishApiKey()}`,
    ...extra,
  };
}

export async function fishFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(`${FISH_API_ROOT}${path}`, init);
  return res;
}

interface FishModelSample {
  title: string;
  text: string;
  audio: string;
}

export interface FishModel {
  _id: string;
  title: string;
  description: string;
  cover_image?: string;
  languages: string[];
  like_count: number;
  task_count: number;
  visibility: string;
  samples: FishModelSample[];
  author?: { nickname: string };
}

export interface PublicVoice {
  id: string;
  title: string;
  description: string;
  languages: string[];
  likeCount: number;
  taskCount: number;
  author: string;
  sampleText: string;
  sampleAudioUrl: string | null;
}

export function mapFishModel(m: FishModel): PublicVoice {
  const sample = m.samples?.[0];
  return {
    id: m._id,
    title: m.title,
    description: m.description || "",
    languages: m.languages || [],
    likeCount: m.like_count || 0,
    taskCount: m.task_count || 0,
    author: m.author?.nickname || "Fish Audio Community",
    sampleText: sample?.text || "",
    sampleAudioUrl: sample?.audio || null,
  };
}
