// Server-only helper for the real Fish Audio API (voice cloning + TTS).
// Never import this from a client component — it reads process.env.FISH_AUDIO_API_KEY.

const FISH_API_ROOT = "https://api.fish.audio";

// Free-tier engine: high quality, zero credit cost on this account.
export const FISH_MODEL = "s2.1-pro-free";

// Per-request cap for a single upstream Fish Audio TTS call.
export const CLONE_CHAR_LIMIT = 1000;

// Overall cap accepted per generate call — longer text is split into
// CLONE_CHAR_LIMIT-sized chunks, synthesized in parallel, then merged.
export const NARRATION_CHAR_LIMIT = 20000;

// Packs text into chunks (<= limit chars each), breaking on sentence
// boundaries first and falling back to word boundaries for any single
// sentence that's still too long.
export function chunkTextForTts(text: string, limit: number = CLONE_CHAR_LIMIT): string[] {
  const sentences = (text.match(/[^.!?]+[.!?]?/g) || [text]).map((s) => s.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current = "";

  const flush = () => {
    if (current) chunks.push(current);
    current = "";
  };

  for (const sentence of sentences) {
    if (sentence.length > limit) {
      flush();
      const words = sentence.split(/\s+/);
      let piece = "";
      for (const word of words) {
        const test = piece ? piece + " " + word : word;
        if (test.length > limit) {
          if (piece) chunks.push(piece);
          piece = word;
        } else piece = test;
      }
      if (piece) chunks.push(piece);
      continue;
    }
    const test = current ? current + " " + sentence : sentence;
    if (test.length > limit) {
      flush();
      current = sentence;
    } else current = test;
  }
  flush();
  return chunks;
}

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
