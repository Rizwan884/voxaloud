import { constructMetadata } from "@/lib/metadata";
import DynamicVideoMaker from "@/components/video-maker/DynamicVideoMaker";
import { Sparkles, Film, Mic2, Clapperboard } from "lucide-react";

export const metadata = constructMetadata({
  title: "Shad Auto Video Maker — Script or Voice to Video, Free",
  description:
    "Turn a script, a YouTube transcript, or your own cloned voice into a finished video automatically — matched with stock B-roll, captions, music and effects.",
  path: "/video-maker",
  useExactTitle: true,
  keywords: [
    "auto video maker",
    "script to video",
    "ai video generator",
    "text to video free",
    "voice to video",
    "b-roll video generator",
  ],
});

export default function VideoMakerPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Shad Auto Video Maker",
    operatingSystem: "Web",
    applicationCategory: "MultimediaApplication",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description:
      "Free browser-based tool that turns a script, YouTube transcript, or cloned AI voice into a finished video with matching stock B-roll.",
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        <section className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            <span>Script or Voice &bull; Auto B-Roll &bull; Runs Fully in Your Browser</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-display text-ink tracking-tight leading-[1.1]">
            Shad Auto <span className="text-muted font-normal">Video Maker</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 leading-relaxed max-w-2xl mx-auto">
            Write a script, paste a YouTube URL, or narrate it with one of your cloned voices — this tool matches
            every scene with stock B-roll, mixes in your narration and music, and exports a finished video.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-ink-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <Film size={13} className="text-accent" /> Auto Stock B-Roll
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <Mic2 size={13} className="text-accent" /> Narrate With Your Cloned Voice
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <Clapperboard size={13} className="text-accent" /> Text, Stickers &amp; Music
            </span>
          </div>
        </section>

        <section className="card-elevated p-3 sm:p-5 bg-surface">
          <DynamicVideoMaker />
        </section>
      </div>
    </main>
  );
}
