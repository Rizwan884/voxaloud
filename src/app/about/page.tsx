import { constructMetadata } from '@/lib/metadata';
import { Mic2, Globe, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'About Fish Audio Online — Mission, Philosophy & Technology',
  description: 'Learn about Fish Audio Online — the premier neural AI voice synthesis and voice cloning platform designed for creators, developers, and global storytellers.',
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

  const values = [
    {
      icon: Mic2,
      title: "Hyper-Realistic Acoustics",
      desc: "We leverage state-of-the-art neural acoustic modeling so our voices capture the subtle cadence, micro-inflections, and emotional resonance of live human speech."
    },
    {
      icon: Globe,
      title: "Global Linguistic Inclusion",
      desc: "With support for 75+ world languages and regional dialects, we empower creators to communicate authentically with audiences across every continent."
    },
    {
      icon: ShieldCheck,
      title: "Total Commercial Freedom",
      desc: "We believe creators should own their intellectual property. Every generation comes with full, unrestricted commercial rights for monetization."
    },
    {
      icon: Heart,
      title: "Frictionless Accessibility",
      desc: "Creative innovation shouldn't be gated behind complex subscriptions or mandatory sign-up walls. We make speech synthesis immediate and effortless."
    }
  ];

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
        
        {/* Header */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            <span>Our Mission &bull; Neural Voice for Everyone</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-display text-ink tracking-tight leading-[1.1]">
            Empowering the world&apos;s storytellers <br />
            <span className="text-muted font-normal">through voice AI.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
            Fish Audio Online was founded on a simple belief: high-fidelity voice cloning and speech synthesis should be accessible to every creator, regardless of budget or technical background.
          </p>
        </header>

        {/* Core Values Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val) => (
            <div key={val.title} className="card p-7 space-y-4 hover:border-accent/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-accent-light text-accent flex items-center justify-center">
                <val.icon size={20} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-ink">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Narrative / Tech Section */}
        <section className="card p-8 sm:p-12 space-y-6 bg-surface text-ink-2 text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl font-bold font-display text-ink tracking-tight">
            The Technology Behind Fish Audio
          </h2>
          <p>
            At the heart of Fish Audio is a zero-shot acoustic synthesis pipeline capable of analyzing short 10-to-30-second speech recordings to extract high-dimensional speaker embeddings. This enables our models to reproduce unique vocal timbre, dynamic range, and natural pauses in real-time.
          </p>
          <p>
            Rather than relying on closed ecosystems or heavy software plugins, we deliver our entire synthesis engine directly inside modern web browsers with sub-second generation latency and 44.1kHz uncompressed export capabilities.
          </p>
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* CTA Card */}
        <section className="p-8 sm:p-12 rounded-3xl bg-ink text-paper text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Ready to experience natural voice AI?
            </h3>
            <p className="text-xs sm:text-sm text-paper/70 leading-relaxed font-normal">
              Clone your voice in 15 seconds or explore 500+ ready-to-use neural voices right now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/voice-clone" className="btn-accent !px-6 !py-3 !text-xs !font-semibold">
                <span>Clone Voice Free</span>
                <ArrowRight size={13} />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-paper/20 bg-paper/10 text-paper font-semibold px-5 py-2.5 rounded-full text-xs hover:bg-paper/15 transition-all">
                <span>Contact Our Team</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
