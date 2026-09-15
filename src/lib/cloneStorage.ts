"use client";

export interface ClonedVoice {
  id: string;
  name: string;
  createdAt: string;
  source: "clone" | "library";
  sampleAudio?: string;
}

export interface CloneGeneration {
  id: string;
  voiceId: string;
  voiceName: string;
  text: string;
  date: string;
  audioUrl: string;
}

const VOICES_KEY = "voxa_cloned_voices";
const HISTORY_KEY = "voxa_clone_history";
const MAX_HISTORY = 8;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — fail silently, non-critical
  }
}

export function getClonedVoices(): ClonedVoice[] {
  return read<ClonedVoice[]>(VOICES_KEY, []);
}

export function saveClonedVoice(voice: ClonedVoice): ClonedVoice[] {
  const existing = getClonedVoices().filter((v) => v.id !== voice.id);
  const next = [voice, ...existing];
  write(VOICES_KEY, next);
  return next;
}

export function removeClonedVoice(id: string): ClonedVoice[] {
  const next = getClonedVoices().filter((v) => v.id !== id);
  write(VOICES_KEY, next);
  return next;
}

export function getCloneHistory(): CloneGeneration[] {
  return read<CloneGeneration[]>(HISTORY_KEY, []);
}

export function saveCloneGeneration(item: CloneGeneration): CloneGeneration[] {
  const next = [item, ...getCloneHistory()].slice(0, MAX_HISTORY);
  write(HISTORY_KEY, next);
  return next;
}

export function clearCloneHistory(): CloneGeneration[] {
  write(HISTORY_KEY, []);
  return [];
}

export function removeCloneGeneration(id: string): CloneGeneration[] {
  const next = getCloneHistory().filter((h) => h.id !== id);
  write(HISTORY_KEY, next);
  return next;
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
