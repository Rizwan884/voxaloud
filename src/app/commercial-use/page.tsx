import { constructMetadata } from '@/lib/metadata';
import UseCases from '@/components/sections/UseCases';
import Features from '@/components/sections/Features';
import { ShieldCheck, Scale, Globe } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Commercial Use — Free AI Voice with Full Commercial License | Fish Audio',
  description: 'Use Fish Audio AI voices freely in YouTube, ads, podcasts, and business projects. Full commercial license. No attribution required. 100% free.',
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

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-24 space-y-24">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black font-display text-ink uppercase tracking-tight leading-none">
            Full Commercial License — <br /><span className="text-muted text-3xl md:text-5xl">Use AI Voices in Any Project, Free.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Scale your content production with absolute confidence. Our <strong>text to speech commercial use</strong> license has zero fees and requires no attribution.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck className="w-8 h-8 text-ink" />, title: 'Full Ownership', desc: 'You own the audio you generate. Perfect for monetization.' },
            { icon: <Scale className="w-8 h-8 text-ink" />, title: 'No Royalties', desc: 'Generate as much as you need without recurring royalty fees.' },
            { icon: <Globe className="w-8 h-8 text-ink" />, title: 'Global Rights', desc: 'Use your generated audio anywhere in the world, on any platform.' }
          ].map((item, i) => (
            <div key={i} className="card-surface p-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center border border-border shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-ink font-display uppercase tracking-tight">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <AdBanner type="728x90" />
        </div>
        <div className="md:hidden">
          <AdBanner type="320x50" />
        </div>

        {/* Detailed commercial policy sections */}
        <section className="space-y-12 max-w-3xl mx-auto border-t border-border/60 pt-16">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black font-display text-ink uppercase tracking-tight">What Is Commercial Text to Speech?</h2>
            <p className="text-muted/80 leading-relaxed font-medium">
              Commercial text to speech refers to using synthetic vocal audio in money-generating ventures. If you use synthesized speech for client projects, business announcements, or promotional videos, you need a <strong>tts with commercial license</strong>. With Fish Audio, you get a lifetime <strong>commercial voice license</strong> standard with every generation, allowing you to use <strong>commercial voiceover ai</strong> globally without restrictions.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black font-display text-ink uppercase tracking-tight">Can I Use AI Voice for YouTube Monetization?</h2>
            <p className="text-muted/80 leading-relaxed font-medium">
              Yes, absolutely! We guarantee <strong>ai voice commercial rights</strong> for all media networks, which makes our platform 
              highly optimized as an <strong>ai voice for content creators</strong>. You can completely monetize videos on YouTube, 
              generate background <strong>royalty free ai narration</strong> for TikTok, or create narration for Spotify podcasts.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black font-display text-ink uppercase tracking-tight">Is Fish Audio TTS Free for Commercial Ads?</h2>
            <p className="text-muted/80 leading-relaxed font-medium">
              Yes, Fish Audio Online is free for commercial ads, social promotions, and product branding. You can create <strong>ai voice for ads</strong> and utilize <strong>tts for advertising</strong> campaigns without any attribution or licensing fee. We also support high-volume <strong>text to speech for business</strong> sites.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black font-display text-ink uppercase tracking-tight">Commercial Voice License — What&apos;s Included</h2>
            <p className="text-muted/80 leading-relaxed font-medium">
              Every download includes a full, royalty-free commercial agreement:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-muted/80 font-medium">
              <li><strong>Royalty Free Voice:</strong> Generate unlimited audio files without paying recurring residuals.</li>
              <li><strong>Lifetime Rights:</strong> Your license does not expire; keep your videos and ads live forever.</li>
              <li><strong>No Attribution Required:</strong> Use the audio anonymously in client work or public videos.</li>
            </ul>
          </div>
        </section>

        <UseCases />
        <Features />

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
