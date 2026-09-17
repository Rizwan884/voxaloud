import Link from "next/link";
import { Clapperboard, ArrowRight, Mic2 } from "lucide-react";

export default function VideoMakerBanner() {
  return (
    <section className="bg-ink text-paper rounded-3xl shadow-2xl shadow-ink/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 overflow-hidden relative">
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
        <Clapperboard size={26} />
      </div>
      <div className="flex-1 text-center sm:text-left space-y-1.5">
        <p className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-accent-subtle">
          New Tool
        </p>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">Shad Auto Video Maker</h2>
        <p className="text-sm text-paper/70 max-w-xl">
          Turn a script or a YouTube link into a finished video with matching B-roll — or narrate it with one of
          your cloned voices instead of uploading audio.
        </p>
      </div>
      <Link
        href="/video-maker"
        className="btn-accent !px-6 !py-3 !text-sm !font-semibold shrink-0 group"
      >
        <Mic2 size={15} className="text-white/80" />
        <span>Try Video Maker</span>
        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </section>
  );
}
