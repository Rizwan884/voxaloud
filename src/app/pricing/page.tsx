import { constructMetadata } from '@/lib/metadata';
import { Check, Zap, Crown, Building2 } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Simple & Transparent Pricing Plans | Fish Audio Online',
  description: 'Explore our flexible pricing plans. Fish Audio Online offers a generous free text to speech plan and premium features for content creators.',
  path: '/pricing',
  useExactTitle: true,
  keywords: [
    "text to speech pricing",
    "ai voice generator cost",
    "free vs paid tts",
    "fish audio pricing plans",
    "voice cloning cost"
  ]
});

const plans = [
  {
    name: 'Free',
    icon: <Zap className="w-5 h-5" />,
    price: '$0',
    desc: 'For personal projects and testing.',
    features: ['10,000 characters per month', 'All standard voices', 'Community support', 'Commercial rights (attribution required)']
  },
  {
    name: 'Pro',
    icon: <Crown className="w-5 h-5" />,
    price: '$19',
    desc: 'For professional content creators.',
    features: ['100,000 characters per month', 'Premium Neural voices', 'Priority processing', 'Commercial rights (no attribution)', 'API Access'],
    featured: true
  },
  {
    name: 'Enterprise',
    icon: <Building2 className="w-5 h-5" />,
    price: 'Custom',
    desc: 'For teams and large-scale needs.',
    features: ['Unlimited characters', 'Custom voice cloning', 'Dedicated account manager', 'SLA guarantees', 'Custom integrations']
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

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-16 text-left">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Get started for free or upgrade for more power and premium features.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`card-surface p-8 flex flex-col relative ${plan.featured ? 'border-ink border-2 scale-105 z-10' : ''}`}>
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink text-paper text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${plan.featured ? 'bg-ink text-paper' : 'bg-surface text-ink border border-border'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-ink font-display">{plan.name}</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-ink font-display">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-muted text-sm ml-1">/mo</span>}
              </div>
              <p className="text-muted text-sm mb-8">{plan.desc}</p>
              <div className="space-y-4 flex-1 mb-8">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-ink mt-0.5 shrink-0" />
                    <span className="text-sm text-muted">{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/" className={`w-full h-12 flex items-center justify-center font-bold rounded-xl transition-all ${plan.featured ? 'bg-ink text-paper hover:shadow-lg' : 'bg-surface text-ink border border-border hover:bg-paper'}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>

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
