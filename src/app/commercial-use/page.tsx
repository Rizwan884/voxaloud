import { constructMetadata } from '@/lib/metadata';
import UseCases from '@/components/sections/UseCases';
import InternalLinks from '@/components/sections/InternalLinks';
import { ShieldCheck, Scale, Globe, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Commercial Use License — Free AI Voice for YouTube & Ads | Fish Audio',
  description: 'Use Fish Audio AI voices freely in YouTube monetization, ads, podcasts, and business projects. Full commercial license. No royalties or attribution.',
  path: '/commercial-use',
  useExactTitle: true,
  keywords: [
    "text to speech commercial use",
    "commercial tts",
    "commercial voice license",
    "ai voice commercial rights",
    "tts with commercial license",
    "royalty free voice",
    "ai voice for ads",
    "commercial voiceover ai"
  ]
});

export default function CommercialUsePage() {
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
        "name": "Commercial Use",
        "item": "https://fishaudio.online/commercial-use"
      }
    ]
  };

  const pillars = [
    { 
      icon: ShieldCheck, 
      title: 'Full Audio Ownership', 
      desc: 'You own 100% of the synthesized audio files you generate. Monetize on YouTube, podcasts, and client campaigns with zero restrictions.' 
    },
    { 
      icon: Scale, 
      title: 'Zero Recurring Royalties', 
      desc: 'Generate as many audio files as you need without worrying about recurring copyright fees or performance residuals.' 
    },
    { 
      icon: Globe, 
      title: 'Worldwide Media Rights', 
      desc: 'Broadcast your audio globally across digital streaming, radio, television, video games, mobile apps, and paid marketing channels.' 
    }
  ];

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Commercial Rights Included &bull; 100% Monetization Safe</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
            Full commercial license, <br />
            <span className="text-muted font-normal">built for modern creators.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
            Scale your content production with complete legal confidence. Every generation synthesized on Fish Audio carries full commercial rights without complicated licensing hoops.
          </p>

          <div className="pt-2">
            <Link href="/" className="btn-accent !px-6 !py-3 !text-xs !font-semibold">
              <Sparkles size={14} />
              <span>Create Commercial Audio</span>
            </Link>
          </div>
        </header>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item) => (
            <div key={item.title} className="card p-7 space-y-4 flex flex-col justify-between hover:border-accent/40 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-surface-2 text-accent flex items-center justify-center border border-border/80 shadow-xs">
                  <item.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-ink font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Policy Details Accordion / Sections */}
        <section className="card p-8 sm:p-12 space-y-10 bg-surface">
          <div className="space-y-3">
            <span className="badge-accent">License Scope</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink tracking-tight">
              Permitted Commercial Applications
            </h2>
            <p className="text-sm text-muted">
              Here is a clear summary of how you can utilize audio synthesized via Fish Audio Online:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'YouTube & Social Media Monetization', desc: 'Monetize video essays, shorts, educational channels, and podcasts without copyright flags.' },
              { title: 'Paid Digital Advertisements', desc: 'Use in Facebook, TikTok, Instagram, Google, and television ad campaigns with zero attribution.' },
              { title: 'Audiobooks & Podcasts', desc: 'Publish audiobooks on Audible, Spotify, Apple Podcasts, or sell digital audio courses directly.' },
              { title: 'Video Games & Software Apps', desc: 'Integrate into indie games, mobile applications, interactive assistants, and voice agents.' },
              { title: 'Client Agency Projects', desc: 'Deliver voiceover audio directly to paying clients without requiring separate licensing transfers.' },
              { title: 'Internal Corporate Training', desc: 'Deploy across company-wide e-learning modules, executive presentations, and video guides.' }
            ].map((p) => (
              <div key={p.title} className="p-4 rounded-xl bg-surface-2/60 border border-border/70 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-xs text-ink font-display">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>{p.title}</span>
                </div>
                <p className="text-xs text-muted leading-relaxed pl-5 font-normal">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-border/70 text-xs text-muted leading-relaxed space-y-2">
            <h4 className="font-bold text-ink text-sm">Restrictions & Responsible Use</h4>
            <p>
              While our commercial license grants broad creative freedom, you may not synthesize defamatory, illegal, or fraudulent audio, nor generate unauthorized deepfakes of public figures without consent. Please review our <Link href="/terms" className="text-accent underline font-semibold">Terms of Service</Link> for complete guidelines.
            </p>
          </div>
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Use Cases */}
        <UseCases />

        {/* Internal Interlinking */}
        <InternalLinks />

      </div>
    </main>
  );
}
