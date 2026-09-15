"use client";

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Upload, Play, Pause, RotateCcw, Loader2, Sparkles, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ClonedVoice } from '@/lib/cloneStorage';

interface Props {
  onCancel: () => void;
  onCloned: (voice: ClonedVoice) => void;
}

const MAX_SECONDS = 60;

function fmt(s: number) {
  return `0:${Math.floor(s).toString().padStart(2, '0')}`;
}

export default function CloneRecorder({ onCancel, onCloned }: Props) {
  const [name, setName] = useState('My Voice');
  const [status, setStatus] = useState<'idle' | 'recording' | 'ready' | 'submitting'>('idle');
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : '';

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        setStatus('ready');
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setStatus('recording');
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) {
            stopRecording();
            return MAX_SECONDS;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setError('Microphone access was denied. You can upload an audio file instead.');
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
  };

  const handleFileUpload = (file: File) => {
    setError(null);
    if (file.size > 20 * 1024 * 1024) {
      setError('File is too large. Please keep it under 20MB.');
      return;
    }
    setAudioBlob(file);
    setAudioUrl(URL.createObjectURL(file));
    setStatus('ready');
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const reset = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setStatus('idle');
    setSeconds(0);
    setIsPlaying(false);
  };

  const submit = async () => {
    if (!audioBlob) return;
    setStatus('submitting');
    setError(null);
    try {
      const form = new FormData();
      form.append('title', name.trim() || 'My Voice');
      const ext = audioBlob.type.includes('mp4') ? 'm4a' : audioBlob.type.includes('wav') ? 'wav' : audioBlob.type.includes('mpeg') ? 'mp3' : 'webm';
      form.append('audio', audioBlob, `sample.${ext}`);

      const res = await fetch('/api/voice-clone/create', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Cloning failed');

      onCloned({
        id: data.id,
        name: name.trim() || 'My Voice',
        createdAt: new Date().toISOString(),
        source: 'clone',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cloning failed. Please try again.');
      setStatus('ready');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="card-surface p-6 border-border/80 space-y-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-black text-ink uppercase tracking-[0.15em]">
          <Sparkles size={12} className="text-muted" />
          Create a New Voice Clone
        </div>
        <button onClick={onCancel} className="p-1 text-muted hover:text-ink hover:bg-surface-2 rounded-full transition-all">
          <X size={16} />
        </button>
      </div>

      <div>
        <label className="text-[9px] font-bold text-muted uppercase tracking-wider block mb-1.5">Voice Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 60))}
          placeholder="e.g. My Podcast Voice"
          className="field !py-2.5 !text-sm"
        />
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
      )}

      <div className="flex flex-col items-center justify-center py-6 bg-paper rounded-2xl border border-border/60">
        {status === 'idle' && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={startRecording}
              className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center shadow-lg shadow-ink/10 hover:scale-105 active:scale-95 transition-transform"
              aria-label="Start recording"
            >
              <Mic size={24} />
            </button>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Tap to record 10–30s of clear speech</p>
            <div className="flex items-center gap-2 text-[10px] text-muted/60 font-bold uppercase tracking-widest">
              <div className="h-px w-8 bg-border" /> or <div className="h-px w-8 bg-border" />
            </div>
            <button onClick={() => fileInputRef.current?.click()} className="btn-outline !text-[11px] !py-2 !px-4">
              <Upload size={13} /> Upload Audio File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              hidden
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); }}
            />
          </div>
        )}

        {status === 'recording' && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={stopRecording}
              className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg relative"
              aria-label="Stop recording"
            >
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
              <Square size={20} fill="currentColor" />
            </button>
            <p className="text-lg font-mono font-black text-ink tabular-nums">{fmt(seconds)}</p>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Recording… tap to stop</p>
          </div>
        )}

        {status === 'ready' && audioUrl && (
          <div className="flex flex-col items-center gap-4 w-full px-4">
            <audio
              ref={audioRef}
              src={audioUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            <button
              onClick={togglePlayback}
              className="w-14 h-14 rounded-full bg-ink text-paper flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Preview your sample</p>
            <div className="flex items-center gap-2 w-full">
              <button onClick={reset} className="btn-outline flex-1 !text-[11px] !py-2.5">
                <RotateCcw size={13} /> Retry
              </button>
              <button onClick={submit} className="btn-primary flex-1 !text-[11px] !py-2.5 uppercase tracking-wider font-black">
                Clone This Voice
              </button>
            </div>
          </div>
        )}

        {status === 'submitting' && (
          <div className="flex flex-col items-center gap-3 py-2">
            <Loader2 size={28} className="animate-spin text-ink" />
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Training your voice model…</p>
          </div>
        )}
      </div>

      <p className="text-[10px] text-muted/60 font-medium leading-relaxed text-center">
        By cloning a voice you confirm you own the rights to this audio or have explicit consent from the speaker.
        Voices are kept private and used only for your own generations.
      </p>
    </motion.div>
  );
}
