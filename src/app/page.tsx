import Hero from '@/components/sections/Hero';
import SocialProofBar from '@/components/sections/SocialProofBar';
import HowToUse from '@/components/sections/HowToUse';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import HomeStudioSwitcher from '@/components/HomeStudioSwitcher';
import ConversionPack from '@/components/sections/ConversionPack';
import AdBanner from '@/components/AdBanner';
import { getVoices } from '@/lib/voices';
import { constructMetadata } from '@/lib/metadata';
import { GLOBAL_FAQS } from '@/lib/faqs';

export const metadata = constructMetadata({
  title: "Fish Audio Online — Free AI Voice Cloning & Text to Speech",
  description: "Clone any voice from a 15-second sample and generate natural AI speech free. 500+ ready-made voices, 75+ languages, instant voice cloning. No login required.",
  path: "/",
  useExactTitle: true,
  keywords: [
    "ai voice cloning",
    "voice cloning free",
    "clone your voice online",
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
    "url": "https://fishaudio.online",
    "description": "Free AI voice cloning and text to speech studio with 500+ natural voices in 75+ languages. Full commercial rights included.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web, iOS, Android",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1240",
      "bestRating": "5"
    },
    "offers": { 
      "@type": "Offer", 
      "price": "0", 
      "priceCurrency": "USD" 
    },
    "featureList": [
      "Zero-Shot AI voice cloning in 15 seconds",
      "500+ neural ready-made voices",
      "75+ international languages and accents",
      "44.1kHz high-fidelity studio exports",
      "Full commercial rights on all generations",
      "Zero mandatory registration barrier"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": GLOBAL_FAQS.slice(0, 10).map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-canvas flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero & Studio Workbench Section */}
      <section className="w-full dot-grid border-b border-border/60 py-8 sm:py-14 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero details */}
            <div className="lg:col-span-5 space-y-6">
              <Hero />
            </div>
            
            {/* Interactive Studio Panel */}
            <div className="lg:col-span-7 w-full">
              <HomeStudioSwitcher initialVoices={initialVoices} />
            </div>

          </div>
        </div>
      </section>

      {/* High-Trust Social Proof Bar */}
      <SocialProofBar />

      {/* Main Page Flow with Disciplined Section Rhythm */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-24 sm:space-y-32">
        
        {/* Interactive Voice Showcase with live audio player */}
        <ConversionPack />

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* 3-Step Visual Workflow */}
        <HowToUse />

        {/* Bento Grid Feature Matrix */}
        <Features />

        {/* Native In-Feed Sponsored Unit */}
        <div className="w-full py-4 border-t border-b border-border/60 bg-surface/50 rounded-2xl p-6">
          <AdBanner type="native" label={true} />
        </div>

        {/* Dark Obsidian Versatility Cases */}
        <UseCases />

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Authentic Customer Testimonials */}
        <Testimonials />

        {/* Objection-Handling Accordion FAQ */}
        <FAQ limit={8} />

        {/* Final High-Converting CTA */}
        <CTA />

      </div>
    </main>
  );
}
