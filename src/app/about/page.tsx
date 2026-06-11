import { constructMetadata } from '@/lib/metadata';
import { Mic2, Globe, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'About Fish Audio Online — The Free AI Text to Speech Platform',
  description: 'Learn about Fish Audio Online — the professional-grade free AI text to speech platform. 500+ natural voices, 75+ languages, commercial use, no login.',
  path: '/about',
  useExactTitle: true,
  keywords: [
    "about fish audio",
    "ai voice platform",
    "neural tts platform",
    "text to speech company",
    "ai voice generator about",
    "professional voice synthesis"
  ]
});

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fishaudio.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://fishaudio.online/about"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-20">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight">
            Our <span className="text-muted">Mission.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted/80 max-w-3xl mx-auto font-medium leading-relaxed">
            We are building the world&apos;s leading <strong>free text to speech platform</strong> — one syllable at a time. 
            Our goal is to make professional-grade <strong>ai voice synthesis</strong> and <strong>neural text to speech</strong> accessible 
            to every creator on the planet. By offering a high-fidelity <strong>natural voice generator</strong> that produces 
            <strong>human-like ai voice</strong> files, we empower users with a reliable, registration-free <strong>commercial tts platform</strong>.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-surface p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-ink flex items-center justify-center shadow-lg shadow-ink/10">
              <Mic2 size={20} className="text-paper" />
            </div>
            <h2 className="text-xl font-black font-display text-ink uppercase tracking-tight">Hyper-Realism</h2>
            <p className="text-sm text-muted/80 leading-relaxed font-medium">
              We leverage the latest breakthroughs in neural modeling to ensure our voices capture the nuance, emotion, and rhythm of human speech. No more robotic monologues.
            </p>
          </div>
          <div className="card-surface p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-ink flex items-center justify-center shadow-lg shadow-ink/10">
              <Globe size={20} className="text-paper" />
            </div>
            <h2 className="text-xl font-black font-display text-ink uppercase tracking-tight">Global Inclusion</h2>
            <p className="text-sm text-muted/80 leading-relaxed font-medium">
              With support for 75+ languages and hundreds of regional accents, we empower creators to speak to a global audience in their native tongue.
            </p>
          </div>
          <div className="card-surface p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-ink flex items-center justify-center shadow-lg shadow-ink/10">
              <ShieldCheck size={20} className="text-paper" />
            </div>
            <h2 className="text-xl font-black font-display text-ink uppercase tracking-tight">Commercial Freedom</h2>
            <p className="text-sm text-muted/80 leading-relaxed font-medium">
              We believe creators should own their work. All audio generated on our platform comes with full commercial rights for use on YouTube, TikTok, and beyond.
            </p>
          </div>
          <div className="card-surface p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-ink flex items-center justify-center shadow-lg shadow-ink/10">
              <Heart size={20} className="text-paper" />
            </div>
            <h2 className="text-xl font-black font-display text-ink uppercase tracking-tight">100% Free</h2>
            <p className="text-sm text-muted/80 leading-relaxed font-medium">
              Innovation shouldn&apos;t be gated by a credit card. We provide unlimited free access to our tools to ensure creativity remains unbound.
            </p>
          </div>
        </section>

        <section className="space-y-8 bg-paper border border-border/60 rounded-[3rem] p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black font-display text-ink uppercase tracking-tight leading-none">
            Ready to <br /> <span className="text-muted text-4xl md:text-7xl">Synthesize?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#studio" className="btn-primary px-10 py-4 rounded-2xl w-full sm:w-auto">
              Generate Voice Free
            </Link>
            <Link href="/contact" className="btn-outline px-10 py-4 rounded-2xl w-full sm:w-auto">
              Get in Touch
            </Link>
          </div>
        </section>

        <div className="hidden md:block pt-8">
          <AdBanner type="728x90" />
        </div>
        <div className="md:hidden pt-8">
          <AdBanner type="320x50" />
        </div>
      </main>
    </div>
  );
}
