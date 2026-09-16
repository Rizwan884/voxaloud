import { constructMetadata } from '@/lib/metadata';
import { ShieldCheck } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Privacy Policy — Data Protection & Privacy | Fish Audio Online',
  description: 'Read the Fish Audio Online privacy policy. Learn how we handle your text inputs, protect your data, and manage cookies for secure voice generation.',
  path: '/privacy',
  useExactTitle: true,
  keywords: [
    "privacy policy",
    "data protection",
    "data security",
    "cookies policy",
    "secure text to speech"
  ]
});

export default function PrivacyPage() {
  const lastUpdated = 'May 11, 2026';

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
        "name": "Privacy",
        "item": "https://fishaudio.online/privacy"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12 text-left">
        
        <header className="space-y-3 pb-8 border-b border-border/80">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Data Privacy &bull; GDPR &amp; CCPA Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted font-medium">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <article className="prose prose-zinc max-w-none space-y-8 text-sm sm:text-base text-ink-2 leading-relaxed
          [&>section]:space-y-3
          [&>section>h2]:text-xl [&>section>h2]:font-bold [&>section>h2]:font-display [&>section>h2]:text-ink
          [&>section>p]:text-muted [&>section>p]:leading-relaxed
          [&>section>ul]:space-y-2 [&>section>ul]:pl-5 [&>section>ul]:list-disc [&>section>ul]:text-muted
          [&>section>ul>li>strong]:text-ink
        ">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              When you use Fish Audio Online, we collect minimal data required to provide and improve our service:
            </p>
            <ul>
              <li><strong>Text Inputs & Audio Prompts:</strong> Text scripts and audio recordings submitted for speech synthesis and voice cloning. Text inputs are processed in-memory and are not sold or redistributed.</li>
              <li><strong>Voice Cloning Audio Samples:</strong> Audio recordings uploaded to create private voice models. These models remain strictly private to your session or account.</li>
              <li><strong>Usage Analytics & Telemetry:</strong> Anonymized metrics including browser type, synthesis latency, device viewport, and geographic region.</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>
              We process your data strictly to execute requested text-to-speech conversions, generate cloned acoustic profiles, optimize synthesis speed, and maintain platform security against abuse.
            </p>
          </section>

          <section>
            <h2>3. Audio Retention & Model Privacy</h2>
            <p>
              Cloned voice models created in your personal account are encrypted and private by default. We do not use your private voice samples to train public foundation models without your explicit, voluntary opt-in consent.
            </p>
          </section>

          <section>
            <h2>4. Third-Party Services & Cookies</h2>
            <p>
              We use trusted cloud compute providers and Supabase for session management. We do not sell your personal data or text scripts to third-party data brokers.
            </p>
          </section>

          <section>
            <h2>5. Contact & Data Deletion Requests</h2>
            <p>
              You have the right to request deletion of your account and associated voice models at any time by contacting our privacy officer at <a href="mailto:contact@fishaudio.online" className="text-accent underline">contact@fishaudio.online</a>.
            </p>
          </section>
        </article>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

      </div>
    </main>
  );
}
