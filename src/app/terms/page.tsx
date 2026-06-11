import { constructMetadata } from '@/lib/metadata';
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
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12 text-left">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight">
            Terms of <span className="text-muted">Service.</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <article className="prose prose-ink max-w-none 
          prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
          prose-p:text-muted/80 prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-ink prose-strong:font-black
          prose-li:text-muted/80
        ">
          <p>
            Welcome to Fish Audio Online. By accessing or using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
          </p>

          <h3>1. Description of Service</h3>
          <p>
            Fish Audio Online provides a web-based interface that leverages artificial intelligence models to convert text into speech. We offer both standard neural voice outputs and voice cloning features.
          </p>

          <h3>2. Content Ownership and Licensing</h3>
          <p>
            You retain all rights to any audio content generated using our service. We grant you a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, distribute, and monetize the synthesized audio for any personal or commercial projects.
          </p>

          <h3>3. Acceptable Use</h3>
          <p>
            You agree not to use Fish Audio Online for any unlawful or prohibited activities, including but not limited to:
          </p>
          <ul>
            <li>Generating audio that is defamatory, hateful, or promotes violence.</li>
            <li>Creating &quot;deepfakes&quot; intended to mislead or harm individuals.</li>
            <li>Attempting to bypass our security measures or reverse-engineer our AI models.</li>
          </ul>

          <h3>4. Service Availability</h3>
          <p>
            While we strive to maintain high availability, we provide our services on an &quot;as-is&quot; and &quot;as-available&quot; basis. We reserve the right to modify, suspend, or terminate the service at any time without notice.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            Fish Audio Online and its developers shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.
          </p>

          <h3>6. Modifications to Terms</h3>
          <p>
            We may update these terms from time to time. Continued use of the service after such changes constitutes your acceptance of the new terms.
          </p>

          <h3>7. Governing Law</h3>
          <p>
            These terms are governed by the laws applicable to our primary place of business, without regard to conflict of law principles.
          </p>
        </article>

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
