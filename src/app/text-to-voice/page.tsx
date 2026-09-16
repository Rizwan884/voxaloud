import { constructMetadata } from '@/lib/metadata';
import InfoBlock from '@/components/sections/InfoBlock';
import SEOArticle from '@/components/sections/SEOArticle';
import InternalLinks from '@/components/sections/InternalLinks';
import ConversionPack from '@/components/sections/ConversionPack';
import DynamicStudio from '@/components/DynamicStudio';
import AdBanner from '@/components/AdBanner';
import { getVoices } from '@/lib/voices';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Text to Voice Online — Convert Text to Speech Free | Fish Audio',
  description: 'Convert text to voice online free. Choose from 500+ realistic AI voices in 75+ languages. Perfect for videos, podcasts, and presentations. Try now.',
  path: '/text-to-voice',
  useExactTitle: true,
  keywords: [
    "text to voice",
    "text to voice online",
    "convert text to voice",
    "text to voice free",
    "voice reader",
    "speech generator",
    "audio generator"
  ]
});

export default async function TextToVoicePage() {
  const initialVoices = await getVoices();

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
        "name": "Text to Voice",
        "item": "https://fishaudio.online/text-to-voice"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            <span>Neural Acoustic Synthesis &bull; Fast Text-to-Voice Conversion</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
              Instant text to voice conversion, <br />
              <span className="text-muted font-normal">crafted for natural flow.</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-2xl mx-auto">
              Precision audio engineering for every syllable. High-fidelity neural voice synthesis that respects natural breath, punctuation pauses, and expressive delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-ink-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <Zap size={13} className="text-accent" />
              Sub-Second Neural Latency
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <ShieldCheck size={13} className="text-emerald-600" />
              Monetization Safe License
            </span>
          </div>
        </section>

        {/* Studio Panel */}
        <section className="card-elevated p-2 sm:p-4 bg-surface">
          <DynamicStudio initialVoices={initialVoices} />
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Info Block */}
        <InfoBlock />

        {/* Interactive Voice Showcase */}
        <ConversionPack />
        
        {/* SEO Explainer Article */}
        <SEOArticle 
          title="The Science Behind High-Fidelity Text to Voice Synthesis"
          subtitle="How deep neural models translate written symbols into nuanced vocal performances"
          content={
            <>
              <p>
                At its foundation, modern <strong>text to voice</strong> conversion acts as the seamless bridge between written thought and audio perception. Rather than standard mechanical reading, Fish Audio Online synthesizes dynamic, rhythmic, and emotive acoustic experiences tailored to human hearing.
              </p>
              
              <h3>The Neural Synthesis Pipeline</h3>
              <p>
                Advanced speech generation moves far beyond concatenative audio stitching. Our architecture operates in interconnected stages:
              </p>
              
              <ul>
                <li><strong>Contextual Text Normalization:</strong> Interprets dates, acronyms, monetary symbols, and sentence context so numbers and abbreviations are spoken naturally.</li>
                <li><strong>Phonetic Prosody Mapping:</strong> Predicts syllable stresses, breathing intervals, and punctuation cadences across 75+ world languages.</li>
                <li><strong>Acoustic Timbre Modeling:</strong> Synthesizes accurate spectral envelopes, capturing the harmonic depth and warmth of each chosen speaker profile.</li>
              </ul>
            </>
          }
        />

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Internal Interlinking */}
        <InternalLinks />

      </div>
    </main>
  );
}
