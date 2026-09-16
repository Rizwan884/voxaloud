import { constructMetadata } from '@/lib/metadata';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import SEOArticle from '@/components/sections/SEOArticle';
import InternalLinks from '@/components/sections/InternalLinks';
import ConversionPack from '@/components/sections/ConversionPack';
import DynamicStudio from '@/components/DynamicStudio';
import AdBanner from '@/components/AdBanner';
import { getVoices } from '@/lib/voices';
import { Sparkles, ShieldCheck, Zap, Globe2 } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Free AI Voice Generator — 500+ Natural Neural Voices | Fish Audio',
  description: 'The best free AI voice generator online. Choose from 500+ natural neural voices. No login needed. Perfect for YouTube, TikTok, podcasts & more.',
  path: '/ai-voice-generator',
  useExactTitle: true,
  keywords: [
    "ai voice generator",
    "ai voice generator free",
    "best ai voice generator",
    "free ai voice generator",
    "ai voice online",
    "text to speech ai",
    "voice generator",
    "ai narrator",
    "voice synthesis",
    "neural voice generator",
    "ai voice 2026"
  ]
});

export default async function AIVoiceGeneratorPage() {
  const initialVoices = await getVoices();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Fish Audio AI Voice Generator",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Free AI voice generator online. Choose from 500+ natural neural voices for YouTube, TikTok, podcasts, and commercial use with no login required."
  };

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
        "name": "AI Voice Generator",
        "item": "https://fishaudio.online/ai-voice-generator"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            <span>500+ Neural Voices &bull; 75+ Languages &bull; Zero Login Barrier</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
              Free AI voice generator <br />
              <span className="text-muted font-normal">with natural neural voices.</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-2xl mx-auto">
              Synthesize realistic, human-like voiceovers from any text in seconds. Whether you need a compelling narrator for YouTube, podcast intros, or business presentations, our studio voices deliver artifact-free speech.
            </p>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-ink-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <ShieldCheck size={13} className="text-emerald-600" />
              100% Commercial License
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <Zap size={13} className="text-accent" />
              No Registration Required
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <Globe2 size={13} className="text-indigo-600" />
              75+ Global Accents
            </span>
          </div>
        </section>

        {/* Studio Panel */}
        <section className="card-elevated p-2 sm:p-4 bg-surface">
          <DynamicStudio initialVoices={initialVoices} />
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Live Audio Demos */}
        <ConversionPack />

        {/* Features Bento */}
        <Features />
        
        {/* SEO Explainer Article */}
        <SEOArticle 
          title="Best AI Voice Generator for Content Creators & Studios"
          subtitle="Unlocking broadcast-grade voice synthesis powered by modern neural networks"
          content={
            <>
              <p>
                The search for the <strong>best AI voice generator</strong> ends here. With Fish Audio Online, you get access to a premium <strong>free AI voice generator</strong> that requires no registrations or forced subscriptions. Our technology is designed to produce natural-sounding <strong>AI voice online</strong> files without the friction or expense of traditional recording studios.
              </p>
              
              <h3>Why Choose Neural Voice Synthesis?</h3>
              <p>
                Modern <strong>voice synthesis</strong> does far more than read text out loud; it infuses punctuation, inflection, and cadence into every phrase. Traditional text-to-speech tools sounded robotic and monotonous. Fish Audio&apos;s <strong>neural voice generator</strong> models synthesize natural pauses and breath cadences that sound remarkably human.
              </p>
              
              <h3>High-Fidelity Studio Capabilities</h3>
              <ul>
                <li><strong>500+ Ready-to-Use Voices:</strong> Choose from dynamic male, female, youthful, authoritative, and character voices.</li>
                <li><strong>75+ International Languages:</strong> Localize scripts across English, Spanish, Hindi, French, German, Japanese, and more.</li>
                <li><strong>Fine-Grained Pitch &amp; Speed Controls:</strong> Tailor audio speed and emotional weight to match your visual video pacing.</li>
                <li><strong>Full Commercial Rights:</strong> Monetize all synthesized speech on YouTube, TikTok, podcasts, and corporate ads.</li>
              </ul>
            </>
          }
        />

        {/* Versatility Cases */}
        <UseCases />

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Internal Interlinking */}
        <InternalLinks />

      </div>
    </main>
  );
}
