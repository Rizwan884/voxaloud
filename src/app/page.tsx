import Hero from '@/components/sections/Hero';
import InfoBlock from '@/components/sections/InfoBlock';
import HowToUse from '@/components/sections/HowToUse';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import DynamicStudio from '@/components/DynamicStudio';
import AdBanner from '@/components/AdBanner';
import { getVoices } from '@/lib/voices';
import { constructMetadata } from '@/lib/metadata';
import { GLOBAL_FAQS } from '@/lib/faqs';
import ConversionPack from '@/components/sections/ConversionPack';

export const metadata = constructMetadata({
  title: "Fish Audio Online — Free AI Text to Speech | Natural Voice Generator",
  description: "Generate natural AI voices free. 500+ realistic text to speech voices in 75+ languages. No login, no limits. Full commercial use. Try free now.",
  path: "/",
  useExactTitle: true,
  keywords: [
    "text to speech",
    "ai voice generator",
    "natural voice generator",
    "free text to speech",
    "text to speech online",
    "tts free",
    "ai text to speech",
    "realistic voice generator",
    "text to speech no login",
    "text to speech commercial use"
  ],
});

export default async function Home() {
  const initialVoices = await getVoices();

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Fish Audio Online",
    "description": "Free AI text to speech generator with 500+ natural voices in 75+ languages. No login required. Commercial use allowed.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": ["Natural voice generator","AI voice cloning","Text to speech free","500+ AI voices","75+ languages","Voice cloning","Commercial license"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": GLOBAL_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-ink/10 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex-1 space-y-20 pb-20">
        
        {/* Main Hero & Studio Grid - Two-column on desktop, stacked on mobile */}
        <main className="max-w-6xl w-full mx-auto px-4 md:px-6 py-6 md:py-10 dot-grid">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero text details */}
            <div className="lg:col-span-6 space-y-6">
              <Hero />
            </div>
            
            {/* Compact studio panel */}
            <div className="lg:col-span-6 w-full">
              <DynamicStudio initialVoices={initialVoices} />
            </div>
          </div>
        </main>

        <div className="max-w-6xl w-full mx-auto px-4 md:px-6 space-y-24 md:space-y-32">
          {/* Hear the difference showcase */}
          <ConversionPack />
          
          <div className="hidden md:block">
            <AdBanner type="728x90" />
          </div>
          <div className="md:hidden">
            <AdBanner type="320x50" />
          </div>

          <InfoBlock />

          <div className="hidden md:block">
            <AdBanner type="728x90" />
          </div>
          <div className="md:hidden">
            <AdBanner type="320x50" />
          </div>

          <HowToUse />

          <div className="hidden md:block">
            <AdBanner type="728x90" />
          </div>
          <div className="md:hidden">
            <AdBanner type="320x50" />
          </div>

          <Features />

          {/* Inline Native Ad block styled with Sponsored label */}
          <div className="w-full py-4 border-t border-b border-border/40 space-y-2 bg-paper/30 rounded-2xl p-6">
            <div className="text-[9px] font-black uppercase tracking-wider text-muted/50 text-left">Sponsored Advertisements</div>
            <AdBanner type="native" />
          </div>

          <UseCases />

          <FAQ limit={10} />

          <div className="hidden md:block">
            <AdBanner type="728x90" />
          </div>
          <div className="md:hidden">
            <AdBanner type="320x50" />
          </div>
          
          <CTA />
        </div>
      </div>
    </div>
  );
}
