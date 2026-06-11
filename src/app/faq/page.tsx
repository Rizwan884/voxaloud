import { constructMetadata } from '@/lib/metadata';
import FAQ from '@/components/sections/FAQ';
import { GLOBAL_FAQS } from '@/lib/faqs';
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
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight leading-none">
            Text to Speech FAQ — <br /><span className="text-muted text-3xl md:text-6xl">Common Questions.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted/80 max-w-2xl mx-auto font-medium">
            Find answers to common questions about free text to speech, AI voice generation, voice cloning, and commercial licensing options.
          </p>
        </header>

        {/* FAQ grid with all 20 entries */}
        <FAQ />

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
