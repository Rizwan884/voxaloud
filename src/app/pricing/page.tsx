import { constructMetadata } from '@/lib/metadata';
import PricingClient from '@/components/pricing/PricingClient';
import AdBanner from '@/components/AdBanner';
import { ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Transparent Pricing Plans & Free Tier | Fish Audio',
  description: 'Explore flexible AI voice cloning and text-to-speech pricing. Free plan with 10,000 chars/mo, instant voice cloning, and Creator Pro options with commercial rights.',
  path: '/pricing',
  useExactTitle: true,
  keywords: [
    "text to speech pricing",
    "ai voice generator cost",
    "free vs paid tts",
    "fish audio pricing plans",
    "voice cloning cost",
    "commercial tts price"
  ]
});

const PRICING_FAQS = [
  {
    q: 'Can I cancel or upgrade my subscription anytime?',
    a: 'Yes, absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings. If you cancel, you will continue to have access to your plan benefits until the end of your current billing period.'
  },
  {
    q: 'What counts as a character?',
    a: 'Every letter, punctuation mark, and space in your text input counts as one character. For example, a 1,000-word script is approximately 5,000 to 6,000 characters.'
  },
  {
    q: 'Are commercial rights included on the Free Starter plan?',
    a: 'Yes! All audio synthesized on Fish Audio can be used commercially for YouTube videos, podcasts, and commercial media. On the Free tier, attribution is appreciated (e.g., "Voiced by Fish Audio Online"), while Pro and Enterprise plans require zero attribution.'
  },
  {
    q: 'How does the 15-second voice cloning feature work?',
    a: 'Our zero-shot neural cloning pipeline only needs 10 to 30 seconds of clean speech. The Free plan includes 1 active cloned voice model, while the Creator Pro and Enterprise plans allow unlimited voice cloning models.'
  },
  {
    q: 'Do you offer an API for developers?',
    a: 'Yes! Creator Pro and Enterprise plans include full access to our high-throughput REST API and streaming endpoints, compatible with standard JSON payloads and audio buffers.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, and Google Pay through our secure Stripe billing infrastructure.'
  }
];

export default function PricingPage() {
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
        "name": "Pricing",
        "item": "https://fishaudio.online/pricing"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Fish Audio Creator Pro",
    "description": "Professional AI voice cloning and high-fidelity text to speech with 150,000 characters per month, unlimited clones, and commercial license.",
    "brand": {
      "@type": "Brand",
      "name": "Fish Audio Online"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Starter",
        "price": "0.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Creator Pro (Annual)",
        "price": "15.00",
        "priceCurrency": "USD",
        "billingIncrement": "month",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* Page Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            <span>Fair & Transparent Pricing &bull; No Hidden Fees</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
            Simple, predictable pricing <br />
            <span className="text-muted font-normal">for creators of all sizes.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-2xl mx-auto">
            Get started completely free with 10,000 characters per month. Upgrade anytime for higher volume, unlimited voice clones, and priority API access.
          </p>
        </header>

        {/* Pricing Interactive Component */}
        <PricingClient />

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Pricing FAQ Section */}
        <section className="space-y-8 max-w-3xl mx-auto pt-8 border-t border-border/80">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink tracking-tight">
              Pricing Questions &amp; Answers
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Everything you need to know about billing, allowances, and rights.
            </p>
          </div>

          <div className="space-y-3">
            {PRICING_FAQS.map((faq) => (
              <details 
                key={faq.q} 
                className="group card p-5 sm:p-6 transition-all duration-200 open:border-accent/40"
              >
                <summary className="font-semibold text-sm sm:text-base text-ink font-display cursor-pointer list-none flex items-center justify-between gap-3">
                  <span>{faq.q}</span>
                  <span className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-muted shrink-0 group-open:rotate-180 transition-transform">
                    <ChevronDown size={15} />
                  </span>
                </summary>
                <p className="pt-3 text-xs sm:text-sm text-muted leading-relaxed border-t border-border/60 mt-3 font-normal">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
