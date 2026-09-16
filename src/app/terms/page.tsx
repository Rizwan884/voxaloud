import { constructMetadata } from '@/lib/metadata';
import { Scale } from 'lucide-react';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Terms of Service — Usage Agreement & Commercial License | Fish Audio',
  description: 'Read the Terms of Service for Fish Audio Online. Understand your rights regarding generated AI voices, commercial use licenses, and acceptable use guidelines.',
  path: '/terms',
  useExactTitle: true,
  keywords: [
    "terms of service",
    "commercial license",
    "usage agreement",
    "legal terms",
    "ai voice licensing"
  ]
});

export default function TermsPage() {
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
        "name": "Terms",
        "item": "https://fishaudio.online/terms"
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-border text-ink-2 text-xs font-semibold shadow-xs">
            <Scale size={14} className="text-accent" />
            <span>Usage Agreement &bull; Commercial Rights</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight">
            Terms of Service
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
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Fish Audio Online (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use immediately.
            </p>
          </section>

          <section>
            <h2>2. Commercial License &amp; Audio Ownership</h2>
            <p>
              Fish Audio grants you a worldwide, perpetual, royalty-free license to commercially monetize, broadcast, distribute, and publish any synthetic audio you generate through the Service, subject to your adherence to our Acceptable Use Policy. For detailed rights, see our <Link href="/commercial-use" className="text-accent underline">Commercial Use Guide</Link>.
            </p>
          </section>

          <section>
            <h2>3. Voice Cloning Rights &amp; Consent</h2>
            <p>
              You represent and warrant that you possess all necessary rights, consents, and authorizations for any audio recordings you upload for voice cloning. You strictly agree not to:
            </p>
            <ul>
              <li>Upload samples of individuals without their verifiable permission.</li>
              <li>Impersonate public figures, political candidates, or private individuals for deceptive or fraudulent purposes.</li>
              <li>Generate defamatory, abusive, threatening, or illegal audio content.</li>
            </ul>
          </section>

          <section>
            <h2>4. Service Availability &amp; Limitations</h2>
            <p>
              We strive for 99.9% uptime, but the Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We reserve the right to throttle abusive generation requests to protect shared compute resources.
            </p>
          </section>

          <section>
            <h2>5. Inquiries &amp; Legal Notices</h2>
            <p>
              For legal inquiries or copyright concerns, contact us at <a href="mailto:contact@fishaudio.online" className="text-accent underline">contact@fishaudio.online</a>.
            </p>
          </section>
        </article>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

      </div>
    </main>
  );
}
