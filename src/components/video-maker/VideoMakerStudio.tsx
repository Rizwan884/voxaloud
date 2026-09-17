"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText, Link2, Mic2, Upload, Loader2, Download, Play, Pause, KeyRound,
  Eye, EyeOff, Type, Smile, Music2, X, RefreshCw, Film, Sparkles,
} from "lucide-react";
import VoiceSourcePanel, { LAST_VOICE_STORAGE, readLastUsedVoice, SelectedVoice } from "./VoiceSourcePanel";
import {
  AspectRatio, OverlayState, Scene, VideoEffect,
  MAX_SCRIPT_WORDS, NARRATION_CHAR_LIMIT, decodeAudioDuration, dimsFor, extractQuery, fmtTime,
  genericVoiceScenes, pickClip, renderVideo, searchPexels, splitParts, synthesizeNarration, wordCount,
} from "./engine";

type NarrationMode = "none" | "upload" | "clone";

const PEXELS_KEY_STORAGE = "shad_video_maker_pexels_key";

const TEMPLATES = [
  { label: "Travel Vlog", text: "Create a cinematic travel vlog about an amazing destination, beautiful scenery, and unforgettable adventures." },
  { label: "Social Media", text: "Create a social media video introducing a creator, with engaging hooks, clean visuals and a modern lifestyle tone." },
  { label: "Business Promo", text: "Create a professional business promo explaining a company service, its value, and a clear call to action." },
  { label: "Food Recipe", text: "Create a delicious food recipe video with ingredients, preparation steps, cooking tips and a final presentation." },
  { label: "Gaming", text: "Create an energetic gaming video with dramatic visuals, gameplay highlights and an exciting esports atmosphere." },
  { label: "Cinematic", text: "Create a cinematic film-style story with dramatic landscapes, emotional pacing and a powerful visual atmosphere." },
];

const STICKER_CHOICES = ["🔥", "❤️", "😂", "👍", "🎉", "⭐", "😮", "💯"];

const EFFECTS: { id: VideoEffect; label: string }[] = [
  { id: "none", label: "None" },
  { id: "grayscale", label: "Grayscale" },
  { id: "sepia", label: "Sepia" },
  { id: "bright", label: "Bright" },
  { id: "contrast", label: "Contrast" },
  { id: "vignette", label: "Vignette" },
];

function DraggableOverlay({
  pos, onMove, children, extraClass,
}: {
  pos: OverlayState;
  onMove: (left: number, top: number) => void;
  children: React.ReactNode;
  extraClass?: string;
}) {
  const dragRef = useRef<{ startX: number; startY: number; startLeft: number; startTop: number } | null>(null);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startLeft: pos.left, startTop: pos.top };
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const wrap = e.currentTarget.parentElement;
    if (!drag || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dx = ((e.clientX - drag.startX) / rect.width) * 100;
    const dy = ((e.clientY - drag.startY) / rect.height) * 100;
    onMove(Math.max(3, Math.min(97, drag.startLeft + dx)), Math.max(5, Math.min(95, drag.startTop + dy)));
  }
  function onPointerUp() {
    dragRef.current = null;
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "absolute",
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        transform: "translate(-50%,-50%)",
        fontSize: pos.size,
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
      className={extraClass}
    >
      {children}
    </div>
  );
}

export default function VideoMakerStudio() {
  const [script, setScript] = useState("");
  const [showYoutubeImport, setShowYoutubeImport] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [transcriptBusy, setTranscriptBusy] = useState(false);
  const [transcriptStatus, setTranscriptStatus] = useState("");

  const [selectedVoice, setSelectedVoice] = useState<SelectedVoice | null>(() => readLastUsedVoice());
  const [narrationMode, setNarrationMode] = useState<NarrationMode>(() => (readLastUsedVoice() ? "clone" : "none"));
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const [pexelsKey, setPexelsKey] = useState(() =>
    typeof window !== "undefined" ? window.localStorage.getItem(PEXELS_KEY_STORAGE) || "" : ""
  );
  const [showKey, setShowKey] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");

  const [voiceUrl, setVoiceUrl] = useState("");
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [voiceLabel, setVoiceLabel] = useState("");

  const [scenes, setScenes] = useState<Scene[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  const [previewUrl, setPreviewUrl] = useState("");
  const [previewDuration, setPreviewDuration] = useState(0);

  const [textClip, setTextClip] = useState("");
  const [textPos, setTextPos] = useState<OverlayState>({ text: "", left: 50, top: 82, size: 28 });
  const [stickerClip, setStickerClip] = useState("");
  const [stickerPos, setStickerPos] = useState<OverlayState>({ text: "", left: 50, top: 30, size: 52 });
  const [effect, setEffect] = useState<VideoEffect>("none");
  const [musicUrl, setMusicUrl] = useState("");
  const [musicName, setMusicName] = useState("");

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pexelsKey) window.localStorage.setItem(PEXELS_KEY_STORAGE, pexelsKey);
  }, [pexelsKey]);

  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const video = previewVideoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [previewUrl]);

  async function applyVoiceFile(file: File) {
    if (!file.type.startsWith("audio/") && !/\.(mp3|wav|m4a|aac|ogg|webm|flac)$/i.test(file.name)) {
      setStatusMessage("Please choose an MP3, WAV or other audio file.");
      return;
    }
    if (voiceUrl) URL.revokeObjectURL(voiceUrl);
    const url = URL.createObjectURL(file);
    const duration = await decodeAudioDuration(url);
    setVoiceUrl(url);
    setVoiceDuration(duration);
    setVoiceLabel(file.name);
    setStatusMessage("Voice ready. You can generate now.");
  }

  function clearVoice() {
    if (voiceUrl) URL.revokeObjectURL(voiceUrl);
    setVoiceUrl("");
    setVoiceDuration(0);
    setVoiceLabel("");
  }

  function selectVoice(voice: SelectedVoice) {
    setSelectedVoice(voice);
    try {
      window.localStorage.setItem(LAST_VOICE_STORAGE, JSON.stringify(voice));
    } catch {}
  }

  function clearSelectedVoice() {
    setSelectedVoice(null);
  }

  function applyMusicFile(file: File) {
    if (musicUrl) URL.revokeObjectURL(musicUrl);
    setMusicUrl(URL.createObjectURL(file));
    setMusicName(file.name);
  }

  function clearMusic() {
    if (musicUrl) URL.revokeObjectURL(musicUrl);
    setMusicUrl("");
    setMusicName("");
  }

  function extractYoutubeId(raw: string) {
    try {
      const u = new URL(raw.trim());
      if (u.hostname.includes("youtu.be")) return u.pathname.split("/").filter(Boolean)[0] || "";
      if (u.hostname.includes("youtube.com")) {
        if (u.searchParams.get("v")) return u.searchParams.get("v") || "";
        const parts = u.pathname.split("/").filter(Boolean);
        const idx = parts.findIndex((x) => ["shorts", "embed", "live"].includes(x));
        if (idx >= 0) return parts[idx + 1] || "";
      }
    } catch {}
    return "";
  }

  function cleanTranscript(raw: string) {
    let text = raw.replace(/\r/g, "");
    text = text.replace(/^\s*#{1,6}\s*transcript\s*$/gim, "");
    text = text.replace(/^\s*(?:[*_`~]+\s*)?\[?\d{1,2}(?::\d{2}){1,2}(?:\.\d+)?\]?\s*(?:[-–—|:]\s*)?/gm, "");
    text = text.replace(/^\s*(?:\[)?\d{1,2}(?::\d{2}){1,2}(?:\.\d+)?(?:\])?\s*$/gm, "");
    const paragraphs = text
      .split(/\n\s*\n+/)
      .map((p) => p.split("\n").map((line) => line.replace(/^\s*[|>]+\s*/, "").trim()).filter(Boolean).join(" ").replace(/\s{2,}/g, " ").trim())
      .filter(Boolean);
    return paragraphs.join("\n\n").trim();
  }

  async function fetchYoutubeTranscript() {
    const id = extractYoutubeId(youtubeUrl);
    if (!id) {
      setTranscriptStatus("Paste a valid YouTube URL (youtube.com or youtu.be).");
      return;
    }
    setTranscriptBusy(true);
    setTranscriptStatus("Fetching transcript…");
    try {
      let text = "";
      const r1 = await fetch(`https://youtube-transcript.ai/transcript/${encodeURIComponent(id)}.txt`, {
        headers: { Accept: "text/plain" },
      });
      if (r1.ok) text = await r1.text();
      if (!text.trim()) {
        const r2 = await fetch(`https://api.freetranscriptapi.com/v1/transcript?video_url=${encodeURIComponent(youtubeUrl)}`, {
          headers: { Accept: "application/json" },
        });
        if (!r2.ok) throw new Error("Transcript service didn't respond.");
        const data = await r2.json();
        text = Array.isArray(data.transcript) ? data.transcript.map((x: unknown) => (typeof x === "string" ? x : (x as { text?: string })?.text || "")).join("\n") : data.text || "";
      }
      const clean = cleanTranscript(text);
      if (!clean) throw new Error("Transcript is empty or unavailable for this video.");
      setScript(clean);
      setShowYoutubeImport(false);
      setTranscriptStatus("✓ Transcript loaded into your script.");
    } catch (err) {
      setTranscriptStatus(err instanceof Error ? err.message : "Couldn't fetch transcript for this video.");
    } finally {
      setTranscriptBusy(false);
    }
  }

  async function handleGenerate() {
    if (isGenerating) return;
    const text = script.trim();
    const usingUpload = narrationMode === "upload" && !!voiceUrl && voiceDuration > 0;
    const usingClonedVoice = narrationMode === "clone" && !!selectedVoice;

    if (usingClonedVoice && !text) {
      setStatusMessage("Write a script first — it's used both for narration and to find matching B-roll.");
      return;
    }
    if (!text && !usingUpload) {
      setStatusMessage("Write a script or add a narration voice first.");
      return;
    }
    if (!pexelsKey.trim()) {
      setStatusMessage("Enter your Pexels API key first (free at pexels.com/api).");
      return;
    }
    if (text && wordCount(text) > MAX_SCRIPT_WORDS) {
      setStatusMessage(`Script limit is ${MAX_SCRIPT_WORDS.toLocaleString()} words.`);
      return;
    }
    if (usingClonedVoice && text.length > NARRATION_CHAR_LIMIT) {
      setStatusMessage(`Narration is limited to ${NARRATION_CHAR_LIMIT.toLocaleString()} characters.`);
      return;
    }

    setIsGenerating(true);
    setProgress(1);
    setStatusMessage("Starting…");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");

    try {
      let narrationUrl = usingUpload ? voiceUrl : "";
      let duration = usingUpload ? voiceDuration : 0;

      if (usingClonedVoice) {
        setIsSynthesizing(true);
        setStatusMessage(`Generating narration with ${selectedVoice!.name}…`);
        const blob = await synthesizeNarration(text, selectedVoice!.id);
        if (voiceUrl) URL.revokeObjectURL(voiceUrl);
        narrationUrl = URL.createObjectURL(blob);
        duration = await decodeAudioDuration(narrationUrl);
        setVoiceUrl(narrationUrl);
        setVoiceDuration(duration);
        setVoiceLabel(`Generated · ${selectedVoice!.name}`);
        setIsSynthesizing(false);
      }

      const hasVoice = !!narrationUrl && duration > 0;
      let nextScenes: Scene[] = [];

      if (!hasVoice && text) {
        duration = Math.max(5, wordCount(text) / 2.35);
      }

      if (!text && hasVoice) {
        setStatusMessage("Voice loaded — creating visual chapters…");
        nextScenes = genericVoiceScenes(duration);
      }

      if (text) {
        let parts = splitParts(text);
        if (parts.length > 40) {
          const step = Math.ceil(parts.length / 40);
          const grouped: string[] = [];
          for (let i = 0; i < parts.length; i += step) grouped.push(parts.slice(i, i + step).join(" "));
          parts = grouped;
        }
        if (!duration) duration = Math.max(5, parts.length * 4);
        const perScene = duration / parts.length;
        nextScenes = [];

        for (let base = 0; base < parts.length; base += 5) {
          const batch = parts.slice(base, base + 5);
          const results = await Promise.all(
            batch.map(async (chunk) => {
              const q = extractQuery(chunk);
              try {
                return { chunk, q, clip: pickClip(await searchPexels(q, pexelsKey, aspectRatio)) };
              } catch {
                return { chunk, q, clip: null };
              }
            })
          );
          results.forEach((r, j) => {
            const i = base + j;
            nextScenes.push({
              id: `sc-${i}`,
              text: r.chunk,
              query: r.q,
              start: i * perScene,
              end: Math.min(duration, (i + 1) * perScene),
              url: r.clip?.url || "",
              thumb: r.clip?.thumb || "",
            });
          });
          setScenes([...nextScenes]);
          setProgress(5 + (Math.min(base + batch.length, parts.length) / parts.length) * 45);
          setStatusMessage(`Finding B-roll: ${Math.min(base + batch.length, parts.length)}/${parts.length}`);
        }
      }

      if (!nextScenes.length) throw new Error("No scenes could be created. Please try again.");

      if (!text) {
        for (let base = 0; base < nextScenes.length; base += 5) {
          const batch = nextScenes.slice(base, base + 5);
          const results = await Promise.all(
            batch.map(async (scene) => {
              try {
                return pickClip(await searchPexels(scene.query, pexelsKey, aspectRatio));
              } catch {
                return null;
              }
            })
          );
          results.forEach((clip, j) => {
            if (clip) {
              nextScenes[base + j].url = clip.url;
              nextScenes[base + j].thumb = clip.thumb;
            }
          });
          setScenes([...nextScenes]);
          setProgress(5 + (Math.min(base + batch.length, nextScenes.length) / nextScenes.length) * 45);
          setStatusMessage(`Finding B-roll: ${Math.min(base + batch.length, nextScenes.length)}/${nextScenes.length}`);
        }
      }

      const found = nextScenes.filter((s) => s.url).length;
      if (!found) throw new Error("Pexels didn't return any usable clips. Check your API key or wording.");

      setScenes([...nextScenes]);
      setStatusMessage(`Rendering ${found} B-roll clips…`);

      const blob = await renderVideo({
        scenes: nextScenes,
        voiceUrl: narrationUrl,
        aspectRatio,
        musicUrl,
        textOverlay: textClip ? { ...textPos, text: textClip } : null,
        stickerOverlay: stickerClip ? { ...stickerPos, text: stickerClip } : null,
        effect,
        wrapEl: videoWrapRef.current,
        onProgress: (frac, idx, total) => {
          setProgress(55 + frac * 40);
          setStatusMessage(`Rendering scene ${idx + 1}/${total}…`);
        },
      });

      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setPreviewDuration(duration);
      setProgress(100);
      setStatusMessage("Final video ready.");
    } catch (err) {
      console.error(err);
      setStatusMessage(err instanceof Error ? err.message : "Video generation failed.");
    } finally {
      setIsSynthesizing(false);
      setIsGenerating(false);
    }
  }

  async function handleExport() {
    if (!scenes.length || isExporting) return;
    setIsExporting(true);
    setStatusMessage("Rendering all edits for export…");
    try {
      const blob = await renderVideo({
        scenes,
        voiceUrl,
        aspectRatio,
        musicUrl,
        textOverlay: textClip ? { ...textPos, text: textClip } : null,
        stickerOverlay: stickerClip ? { ...stickerPos, text: stickerClip } : null,
        effect,
        wrapEl: videoWrapRef.current,
        onProgress: (frac, idx, total) => setStatusMessage(`Rendering scene ${idx + 1}/${total}…`),
      });
      const ext = blob.type.includes("mp4") ? "mp4" : "webm";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `shad-auto-video.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      setStatusMessage("Video exported with your latest edits.");
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : "Export failed.");
    } finally {
      setIsExporting(false);
    }
  }

  async function handleReplaceScene(index: number) {
    const query = window.prompt("New Pexels search keyword:", scenes[index]?.query || "");
    if (!query) return;
    try {
      const clip = pickClip(await searchPexels(query, pexelsKey, aspectRatio));
      if (!clip) {
        setStatusMessage("No matching video found for that keyword.");
        return;
      }
      const nextScenes = scenes.map((s, i) => (i === index ? { ...s, query, url: clip.url, thumb: clip.thumb } : s));
      setScenes(nextScenes);
      setStatusMessage("Re-rendering with the replaced scene…");
      const blob = await renderVideo({
        scenes: nextScenes,
        voiceUrl,
        aspectRatio,
        musicUrl,
        textOverlay: textClip ? { ...textPos, text: textClip } : null,
        stickerOverlay: stickerClip ? { ...stickerPos, text: stickerClip } : null,
        effect,
        wrapEl: videoWrapRef.current,
        onProgress: () => {},
      });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setStatusMessage("Scene replaced.");
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : "Couldn't replace that scene.");
    }
  }

  const dims = dimsFor(aspectRatio);
  const usingUpload = narrationMode === "upload" && !!voiceUrl && voiceDuration > 0;
  const usingClonedVoice = narrationMode === "clone" && !!selectedVoice;
  const canGenerate =
    (!!script.trim() || usingUpload) &&
    (!usingClonedVoice || !!script.trim()) &&
    !!pexelsKey.trim() &&
    !isGenerating;

  return (
    <div className="grid lg:grid-cols-12 gap-5">
      {/* Left: input + settings */}
      <div className="lg:col-span-5 space-y-5">
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-muted flex items-center gap-1.5">
              <FileText size={12} /> Script
            </label>
            <button
              onClick={() => setShowYoutubeImport((v) => !v)}
              className="text-[10px] font-bold text-accent hover:underline flex items-center gap-1"
            >
              <Link2 size={11} /> Import from YouTube
            </button>
          </div>

          {showYoutubeImport && (
            <div className="space-y-2 bg-surface-2 border border-border rounded-xl p-3">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchYoutubeTranscript()}
                  placeholder="https://youtube.com/watch?v=…"
                  className="field flex-1"
                />
                <button
                  onClick={fetchYoutubeTranscript}
                  disabled={transcriptBusy}
                  className="btn-primary !px-4 whitespace-nowrap text-xs"
                >
                  {transcriptBusy ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Get Transcript
                </button>
              </div>
              {transcriptStatus && <p className="text-[11px] text-muted">{transcriptStatus}</p>}
            </div>
          )}

          <div className="relative">
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Enter your script, topic or ideas here…"
              className="field min-h-[150px] resize-y"
            />
            <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-muted/70">
              {wordCount(script).toLocaleString()} / {MAX_SCRIPT_WORDS.toLocaleString()} words
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TEMPLATES.map((t) => (
              <button
                key={t.label}
                onClick={() => setScript(t.text)}
                className="chip !py-1 !px-2.5 text-[10px] hover:border-ink/40 hover:bg-surface-2 transition-colors"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5 space-y-3">
          <label className="text-[10px] font-black uppercase tracking-wider text-muted">Narration Voice</label>
          <div className="flex items-center gap-1 p-1 bg-surface-2 rounded-xl w-fit">
            <button
              onClick={() => setNarrationMode("none")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all ${narrationMode === "none" ? "bg-paper text-ink shadow-sm" : "text-muted hover:text-ink"}`}
            >
              No Voice
            </button>
            <button
              onClick={() => setNarrationMode("upload")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all ${narrationMode === "upload" ? "bg-paper text-ink shadow-sm" : "text-muted hover:text-ink"}`}
            >
              <Upload size={13} /> Upload File
            </button>
            <button
              onClick={() => setNarrationMode("clone")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all ${narrationMode === "clone" ? "bg-paper text-ink shadow-sm" : "text-muted hover:text-ink"}`}
            >
              <Mic2 size={13} /> Choose Voice
            </button>
          </div>

          {narrationMode === "none" && (
            <p className="text-[11px] text-muted">No narration — video length is estimated from your script.</p>
          )}

          {narrationMode === "upload" && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 border border-dashed border-border rounded-xl px-4 py-4 cursor-pointer hover:border-ink/30 hover:bg-surface-2/60 transition-all">
                <Upload size={16} className="text-muted shrink-0" />
                <span className="text-xs text-muted">Click to upload a narration audio file (MP3, WAV, M4A, AAC, OGG)</span>
                <input
                  type="file"
                  accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg,.webm,.flac"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) applyVoiceFile(file);
                    e.target.value = "";
                  }}
                />
              </label>
              {voiceLabel && (
                <div className="flex items-center justify-between gap-3 bg-surface-2 border border-border rounded-xl px-4 py-2.5">
                  <span className="text-xs text-ink font-medium truncate">
                    {voiceLabel} <span className="text-muted font-normal">· {fmtTime(voiceDuration)}</span>
                  </span>
                  <button onClick={clearVoice} className="p-1 text-muted hover:text-red-500 shrink-0" title="Remove voice">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {narrationMode === "clone" && (
            <div className="space-y-2">
              <p className="text-[11px] text-muted">Uses the script above as the narration text.</p>
              <VoiceSourcePanel selectedVoice={selectedVoice} onSelectVoice={selectVoice} onClearVoice={clearSelectedVoice} />
            </div>
          )}
        </div>

        <div className="card p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-muted flex items-center gap-1.5">
              <KeyRound size={11} /> Pexels API Key
            </label>
            <div className="flex gap-2">
              <input
                type={showKey ? "text" : "password"}
                value={pexelsKey}
                onChange={(e) => setPexelsKey(e.target.value)}
                placeholder="Paste your free Pexels API key"
                className="field flex-1"
              />
              <button onClick={() => setShowKey((v) => !v)} className="btn-outline !px-3">
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <p className="text-[10px] text-muted/70">
              Used only in your browser to fetch stock B-roll — get a free key at{" "}
              <a href="https://www.pexels.com/api/" target="_blank" rel="noopener noreferrer" className="underline">
                pexels.com/api
              </a>
              .
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-muted">Aspect Ratio</label>
            <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as AspectRatio)} className="field">
              <option value="16:9">16:9 Landscape</option>
              <option value="9:16">9:16 Vertical</option>
              <option value="1:1">1:1 Square</option>
            </select>
          </div>

          <button onClick={handleGenerate} disabled={!canGenerate} className="btn-primary w-full !py-3 text-sm">
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {isSynthesizing ? "Generating Narration…" : "Generating Video…"}
              </>
            ) : (
              <>
                <Film size={16} /> Generate Video
              </>
            )}
          </button>

          {(isGenerating || progress > 0) && progress < 100 && (
            <div className="space-y-1">
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all duration-150" style={{ width: `${Math.min(100, progress)}%` }} />
              </div>
            </div>
          )}
          {statusMessage && <p className="text-[11px] text-muted">{statusMessage}</p>}
        </div>

        {scenes.length > 0 && (
          <div className="card p-5 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-muted">
              Scenes <span className="text-ink">({scenes.length})</span>
            </p>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {scenes.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2.5 bg-surface-2 rounded-lg p-2">
                  {s.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.thumb} alt="" className="w-14 h-8 object-cover rounded shrink-0 bg-ink/10" />
                  ) : (
                    <div className="w-14 h-8 rounded shrink-0 bg-ink/10 flex items-center justify-center text-[9px] text-muted">no clip</div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-ink truncate">Scene {i + 1}</p>
                    <p className="text-[10px] text-muted truncate">{s.query}</p>
                  </div>
                  <button onClick={() => handleReplaceScene(i)} className="text-[10px] font-bold text-accent shrink-0 hover:underline">
                    Replace
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: preview + timeline edits */}
      <div className="lg:col-span-7 space-y-5">
        <div className="card p-4 space-y-3">
          <div
            ref={videoWrapRef}
            className="relative w-full bg-black rounded-xl overflow-hidden border border-border mx-auto"
            style={{ aspectRatio: aspectRatio.replace(":", "/"), maxWidth: dims.w > dims.h ? "100%" : 420 }}
          >
            {previewUrl ? (
              <video ref={previewVideoRef} src={previewUrl} controls playsInline className="w-full h-full object-contain" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-1 text-white/70">
                <Film size={26} />
                <p className="text-sm font-semibold">Video Preview</p>
                <p className="text-[11px] text-white/40">Your generated video will appear here</p>
              </div>
            )}
            {textClip && (
              <DraggableOverlay pos={textPos} onMove={(left, top) => setTextPos((p) => ({ ...p, left, top }))} extraClass="font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                {textClip}
              </DraggableOverlay>
            )}
            {stickerClip && (
              <DraggableOverlay pos={stickerPos} onMove={(left, top) => setStickerPos((p) => ({ ...p, left, top }))}>
                {stickerClip}
              </DraggableOverlay>
            )}
          </div>
          {previewUrl && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => (isPlaying ? previewVideoRef.current?.pause() : previewVideoRef.current?.play())}
                className="btn-outline !p-2.5 !rounded-full"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <span className="text-[11px] text-muted flex-1">{fmtTime(previewDuration)}</span>
              <button onClick={handleExport} disabled={isExporting} className="btn-accent !px-4 text-xs">
                {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                Export Video
              </button>
            </div>
          )}
        </div>

        <div className="card p-5 space-y-5">
          <p className="text-[10px] font-black uppercase tracking-wider text-muted">Edit &amp; Overlays</p>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink flex items-center gap-1.5">
              <Type size={12} /> Text Overlay
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={textClip}
                onChange={(e) => setTextClip(e.target.value)}
                placeholder="e.g. Subscribe for more!"
                className="field flex-1"
              />
              {textClip && (
                <button onClick={() => setTextClip("")} className="btn-outline !px-3">
                  <X size={14} />
                </button>
              )}
            </div>
            {textClip && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted w-10">Size</span>
                <input
                  type="range"
                  min={14}
                  max={64}
                  value={textPos.size}
                  onChange={(e) => setTextPos((p) => ({ ...p, size: Number(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-[10px] text-muted font-mono w-8 text-right">{textPos.size}px</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink flex items-center gap-1.5">
              <Smile size={12} /> Sticker
            </label>
            <div className="flex flex-wrap gap-1.5">
              {STICKER_CHOICES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStickerClip(s)}
                  className={`w-9 h-9 rounded-lg border text-lg flex items-center justify-center transition-all ${stickerClip === s ? "border-ink bg-surface-2" : "border-border hover:border-ink/30"}`}
                >
                  {s}
                </button>
              ))}
              {stickerClip && (
                <button onClick={() => setStickerClip("")} className="btn-outline !px-3">
                  <X size={14} />
                </button>
              )}
            </div>
            {stickerClip && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted w-10">Size</span>
                <input
                  type="range"
                  min={24}
                  max={120}
                  value={stickerPos.size}
                  onChange={(e) => setStickerPos((p) => ({ ...p, size: Number(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-[10px] text-muted font-mono w-8 text-right">{stickerPos.size}px</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink flex items-center gap-1.5">
              <Music2 size={12} /> Background Music
            </label>
            {musicUrl ? (
              <div className="flex items-center justify-between gap-2 bg-surface-2 border border-border rounded-xl px-3.5 py-2.5">
                <span className="text-xs text-ink truncate">{musicName}</span>
                <button onClick={clearMusic} className="p-1 text-muted hover:text-red-500 shrink-0">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2.5 border border-dashed border-border rounded-xl px-3.5 py-3 cursor-pointer hover:border-ink/30 hover:bg-surface-2/60 transition-all">
                <Music2 size={14} className="text-muted shrink-0" />
                <span className="text-[11px] text-muted">Click to add a background music track</span>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) applyMusicFile(file);
                    e.target.value = "";
                  }}
                />
              </label>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-ink flex items-center gap-1.5">
              <RefreshCw size={12} /> Visual Effect
            </label>
            <div className="flex flex-wrap gap-1.5">
              {EFFECTS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setEffect(e.id)}
                  className={`chip !py-1.5 !px-3 text-[11px] transition-colors ${effect === e.id ? "!bg-ink !text-paper !border-ink" : "hover:border-ink/40"}`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
