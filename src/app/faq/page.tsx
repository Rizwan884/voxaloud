import { constructMetadata } from '@/lib/metadata';
import FAQ from '@/components/sections/FAQ';
import { GLOBAL_FAQS } from '@/lib/faqs';
import { HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Text to Speech FAQ — Common Questions About Fish Audio | AI Voice Help',
  description: 'Answers to common questions about free text to speech, AI voice generation, voice cloning, commercial use, language support, and more.',
  path: '/faq',
  useExactTitle: true,
  keywords: [
    "text to speech faq",
    "ai voice generator faq",
    "best free tts questions",
    "voice cloning help",
    "commercial tts license questions"
  ]
});

export default function FAQPage() {
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
        "name": "FAQ",
        "item": "https://fishaudio.online/faq"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
        
        {/* Header */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <HelpCircle size={13} className="text-accent" />
            <span>Knowledge Base &bull; Frequently Asked Questions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
            Common questions, <br />
            <span className="text-muted font-normal">answered clearly.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
            Find immediate answers regarding voice cloning quality, character allowances, language coverage, commercial licensing, and audio exports.
          </p>
        </header>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Complete Accordion FAQ */}
        <FAQ />

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Still need help callout */}
        <div className="card p-8 text-center space-y-4 max-w-xl mx-auto bg-surface-2/60">
          <h3 className="text-lg font-bold font-display text-ink">
            Still have a question?
          </h3>
          <p className="text-xs sm:text-sm text-muted">
            Can&apos;t find what you are looking for? Send a message directly to our engineering and support team.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="btn-accent !px-6 !py-2.5 !text-xs !font-semibold inline-flex items-center gap-2">
              <span>Contact Support</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
