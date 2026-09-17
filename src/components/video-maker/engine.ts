export interface Scene {
  id: string;
  text: string;
  query: string;
  start: number;
  end: number;
  url: string;
  thumb: string;
}

export type AspectRatio = "16:9" | "9:16" | "1:1";
export type VideoEffect = "none" | "grayscale" | "sepia" | "bright" | "contrast" | "vignette";

export interface OverlayState {
  text: string;
  left: number;
  top: number;
  size: number;
}

export const MAX_SCRIPT_WORDS = 20000;

export function fmtTime(sec: number) {
  if (!Number.isFinite(sec) || sec <= 0) return "--:--";
  return `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, "0")}`;
}

export function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

// Splits a script into sentence-like chunks; falls back to fixed-size word
// batches when the text has no sentence punctuation to split on.
export function splitParts(text: string): string[] {
  let parts = (text.match(/[^.!?]+[.!?]?/g) || []).map((x) => x.trim()).filter(Boolean);
  if (parts.length <= 1) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const chunkSize = 45;
    parts = [];
    for (let i = 0; i < words.length; i += chunkSize) parts.push(words.slice(i, i + chunkSize).join(" "));
  }
  return parts;
}

const STOPWORDS = new Set(
  "the a an and or but if then this that these those is are was were to of in on for with from by as at it its be been being i you he she they we our your their have has had will would can could should may might about into over after before during than so very not no do does did my me his her them there here when where what which who why how this video make made using use more very just also into from your".split(
    " "
  )
);

// Picks the most frequent, meaningful words from a script chunk to use as a
// Pexels stock-video search query.
export function extractQuery(text: string): string {
  const freq: Record<string, number> = {};
  for (const w of text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/)) {
    if (w.length > 3 && !STOPWORDS.has(w)) freq[w] = (freq[w] || 0) + 1;
  }
  const top = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map((x) => x[0])
    .join(" ");
  return top || text.split(/\s+/).slice(0, 4).join(" ");
}

interface PexelsVideoFile {
  link: string;
  file_type: string;
  width?: number;
}
interface PexelsVideo {
  video_files: PexelsVideoFile[];
  image: string;
}
interface PexelsResponse {
  videos?: PexelsVideo[];
}

export async function searchPexels(query: string, apiKey: string, aspectRatio: AspectRatio): Promise<PexelsResponse> {
  const orientation = aspectRatio === "9:16" ? "portrait" : aspectRatio === "1:1" ? "square" : "landscape";
  const res = await fetch(
    `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=8&orientation=${orientation}`,
    { headers: { Authorization: apiKey } }
  );
  if (!res.ok) throw new Error(`Pexels API error ${res.status}. Check that your API key is correct.`);
  return res.json();
}

export function pickClip(data: PexelsResponse): { url: string; thumb: string } | null {
  for (const v of data.videos || []) {
    const files = (v.video_files || [])
      .filter((f) => f.file_type === "video/mp4")
      .sort((a, b) => Math.abs((a.width || 1280) - 1280) - Math.abs((b.width || 1280) - 1280));
    if (files[0]) return { url: files[0].link, thumb: v.image };
  }
  return null;
}

const GENERIC_TOPICS = [
  "technology city", "business technology", "artificial intelligence", "data analytics",
  "automation robotics", "digital network", "entrepreneur success", "business growth",
  "modern office", "computer coding", "future technology", "innovation",
];

export function genericVoiceScenes(duration: number): Scene[] {
  const n = Math.max(1, Math.min(40, Math.ceil(duration / 18)));
  const step = duration / n;
  return Array.from({ length: n }, (_, i) => ({
    id: `voice-${i}`,
    text: `Voice Scene ${i + 1}`,
    query: GENERIC_TOPICS[i % GENERIC_TOPICS.length],
    start: i * step,
    end: Math.min(duration, (i + 1) * step),
    url: "",
    thumb: "",
  }));
}

export function dimsFor(ratio: AspectRatio) {
  if (ratio === "9:16") return { w: 720, h: 1280 };
  if (ratio === "1:1") return { w: 1080, h: 1080 };
  return { w: 1280, h: 720 };
}

function chooseMime() {
  const candidates = [
    "video/mp4;codecs=avc1,mp4a.40.2",
    "video/mp4",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  return candidates.find((t) => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) || "video/webm";
}

function loadClip(url: string): Promise<HTMLVideoElement | null> {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const v = document.createElement("video");
    v.src = url;
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.crossOrigin = "anonymous";
    let finished = false;
    const finish = (x: HTMLVideoElement | null) => {
      if (finished) return;
      finished = true;
      resolve(x);
    };
    v.onloadeddata = () => finish(v);
    v.onerror = () => finish(null);
    setTimeout(() => finish(null), 4000);
    v.load();
  });
}

export function decodeAudioDuration(url: string): Promise<number> {
  return new Promise((resolve) => {
    const a = new Audio();
    a.preload = "metadata";
    a.src = url;
    a.onloadedmetadata = () => resolve(Number.isFinite(a.duration) ? a.duration : 0);
    a.onerror = () => resolve(0);
  });
}

interface RenderOptions {
  scenes: Scene[];
  voiceUrl: string;
  aspectRatio: AspectRatio;
  musicUrl: string;
  textOverlay: OverlayState | null;
  stickerOverlay: OverlayState | null;
  effect: VideoEffect;
  wrapEl: HTMLElement | null;
  onProgress: (fraction: number, sceneIndex: number, total: number) => void;
}

// Draws each B-roll clip onto an offscreen canvas while a MediaRecorder
// captures the canvas stream + mixed narration/music audio into a video file.
export async function renderVideo({
  scenes,
  voiceUrl,
  aspectRatio,
  musicUrl,
  textOverlay,
  stickerOverlay,
  effect,
  wrapEl,
  onProgress,
}: RenderOptions): Promise<Blob> {
  if (!scenes.length) throw new Error("No scenes to render.");
  if (!HTMLCanvasElement.prototype.captureStream || !window.MediaRecorder) {
    throw new Error("This browser can't export video. Please use a recent Chrome or Edge.");
  }

  const { w, h } = dimsFor(aspectRatio);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const rawCtx = canvas.getContext("2d");
  if (!rawCtx) throw new Error("Canvas is not supported in this browser.");
  const ctx: CanvasRenderingContext2D = rawCtx;
  const videoStream = canvas.captureStream(30);

  let ac: AudioContext | null = null;
  let dest: MediaStreamAudioDestinationNode | null = null;
  let voiceAudio: HTMLAudioElement | null = null;
  let musicAudio: HTMLAudioElement | null = null;
  let current: HTMLVideoElement | null = null;
  let raf = 0;
  let running = true;

  function drawTextOverlay() {
    if (!textOverlay?.text) return;
    const x = canvas.width * (textOverlay.left / 100);
    const y = canvas.height * (textOverlay.top / 100);
    const scale = canvas.width / Math.max(1, wrapEl?.getBoundingClientRect().width || 1280);
    const size = Math.max(12, textOverlay.size * scale);
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `900 ${size}px Arial, sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,.9)";
    ctx.shadowBlur = size * 0.35;
    ctx.shadowOffsetY = size * 0.08;
    ctx.fillStyle = "#ffffff";
    const maxW = canvas.width * 0.88;
    if (ctx.measureText(textOverlay.text).width <= maxW) {
      ctx.fillText(textOverlay.text, x, y);
    } else {
      const words = textOverlay.text.split(/\s+/);
      let line = "";
      const lines: string[] = [];
      words.forEach((word) => {
        const test = line ? line + " " + word : word;
        if (ctx.measureText(test).width > maxW && line) {
          lines.push(line);
          line = word;
        } else line = test;
      });
      if (line) lines.push(line);
      const lineHeight = size * 1.15;
      const first = y - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((l, i) => ctx.fillText(l, x, first + i * lineHeight));
    }
    ctx.restore();
  }

  function drawStickerOverlay() {
    if (!stickerOverlay?.text) return;
    const x = canvas.width * (stickerOverlay.left / 100);
    const y = canvas.height * (stickerOverlay.top / 100);
    const scale = canvas.width / Math.max(1, wrapEl?.getBoundingClientRect().width || 1280);
    const size = Math.max(20, stickerOverlay.size * scale);
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${size}px "Segoe UI Emoji","Apple Color Emoji",sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,.8)";
    ctx.shadowBlur = size * 0.18;
    ctx.fillText(stickerOverlay.text, x, y);
    ctx.restore();
  }

  function drawVignette() {
    if (effect !== "vignette") return;
    const g = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.height * 0.18,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.72
    );
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.62, "rgba(0,0,0,.08)");
    g.addColorStop(1, "rgba(0,0,0,.82)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#05070b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let filter = "none";
    if (effect === "grayscale") filter = "grayscale(1)";
    if (effect === "sepia") filter = "sepia(.8)";
    if (effect === "bright") filter = "brightness(1.2) saturate(1.15)";
    if (effect === "contrast") filter = "contrast(1.25)";
    ctx.filter = filter;

    if (current && current.readyState >= 2 && current.videoWidth) {
      const scale = Math.max(canvas.width / current.videoWidth, canvas.height / current.videoHeight);
      const vw = current.videoWidth * scale;
      const vh = current.videoHeight * scale;
      ctx.drawImage(current, (canvas.width - vw) / 2, (canvas.height - vh) / 2, vw, vh);
    }
    ctx.filter = "none";

    drawTextOverlay();
    drawStickerOverlay();
    drawVignette();

    ctx.restore();
    if (running) raf = requestAnimationFrame(draw);
  }

  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AC && (voiceUrl || musicUrl)) {
      ac = new AC();
      dest = ac.createMediaStreamDestination();

      if (voiceUrl) {
        voiceAudio = new Audio();
        voiceAudio.src = voiceUrl;
        voiceAudio.preload = "auto";
        await new Promise<void>((resolve, reject) => {
          if (voiceAudio!.readyState >= 1) return resolve();
          voiceAudio!.onloadedmetadata = () => resolve();
          voiceAudio!.onerror = () => reject(new Error("Voice audio could not be loaded."));
          setTimeout(() => reject(new Error("Voice audio load timed out.")), 8000);
        });
        ac.createMediaElementSource(voiceAudio).connect(dest);
      }

      if (musicUrl) {
        musicAudio = new Audio();
        musicAudio.src = musicUrl;
        musicAudio.preload = "auto";
        musicAudio.loop = true;
        await new Promise<void>((resolve, reject) => {
          if (musicAudio!.readyState >= 1) return resolve();
          musicAudio!.onloadedmetadata = () => resolve();
          musicAudio!.onerror = () => reject(new Error("Music audio could not be loaded."));
          setTimeout(() => reject(new Error("Music audio load timed out.")), 8000);
        });
        ac.createMediaElementSource(musicAudio).connect(dest);
      }
    }

    const tracks = [...videoStream.getVideoTracks()];
    if (dest) tracks.push(...dest.stream.getAudioTracks());
    const stream = new MediaStream(tracks);
    const recorder = new MediaRecorder(stream, { mimeType: chooseMime(), videoBitsPerSecond: 6_000_000 });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    const stopped = new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });

    draw();
    recorder.start(250);

    if (ac && ac.state === "suspended") await ac.resume();
    if (voiceAudio) await voiceAudio.play().catch(() => {});
    if (musicAudio) await musicAudio.play().catch(() => {});

    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      current = await loadClip(scene.url);
      if (current) {
        try {
          await current.play();
        } catch {}
      }
      const sceneMs = Math.max(500, (scene.end - scene.start) * 1000);
      const until = performance.now() + sceneMs;
      while (performance.now() < until) {
        onProgress(i / scenes.length, i, scenes.length);
        await new Promise((r) => setTimeout(r, 100));
      }
      if (current) {
        try {
          current.pause();
        } catch {}
      }
    }

    if (voiceAudio) voiceAudio.pause();
    if (musicAudio) musicAudio.pause();

    running = false;
    cancelAnimationFrame(raf);
    recorder.stop();
    await stopped;
    if (ac) await ac.close().catch(() => {});

    onProgress(1, scenes.length, scenes.length);
    return new Blob(chunks, { type: recorder.mimeType || "video/webm" });
  } catch (err) {
    running = false;
    cancelAnimationFrame(raf);
    if (voiceAudio) voiceAudio.pause();
    if (musicAudio) musicAudio.pause();
    if (ac) await ac.close().catch(() => {});
    throw err;
  }
}
