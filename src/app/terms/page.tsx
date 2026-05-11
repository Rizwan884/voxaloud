import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'Terms of Service | Fish Audio Online Usage Agreement',
  description: 'Understand the terms and conditions for using our AI voice generation platform and your rights regarding synthesized audio.',
  path: '/terms',
});

export default function TermsPage() {
  const lastUpdated = 'May 11, 2026';

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12">
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
            By accessing or using Fish Audio Online, you agree to comply with and be bound by these Terms of Service. Please read them carefully.
          </p>

          <h3>1. Acceptance of Terms</h3>
          <p>
            Use of our services constitutes your full acceptance of these terms. If you do not agree to these terms, you must not use our platform.
          </p>

          <h3>2. Commercial License & Ownership</h3>
          <p>
            We grant all users a **non-exclusive, worldwide, royalty-free license** to use the audio generated on our platform for any purpose, including commercial projects (YouTube, advertisements, audiobooks, etc.). 
          </p>
          <ul>
            <li>You retain ownership of the scripts and final audio outputs.</li>
            <li>You are responsible for ensuring that your use of the audio does not violate any third-party rights or local laws.</li>
          </ul>

          <h3>3. Acceptable Use</h3>
          <p>
            You agree not to use Fish Audio Online for any unlawful or prohibited activities, including but not limited to:
          </p>
          <ul>
            <li>Generating audio that is defamatory, hateful, or promotes violence.</li>
            <li>Creating "deepfakes" intended to mislead or harm individuals.</li>
            <li>Attempting to bypass our security measures or reverse-engineer our AI models.</li>
          </ul>

          <h3>4. Service Availability</h3>
          <p>
            While we strive to maintain high availability, we provide our services on an "as-is" and "as-available" basis. We reserve the right to modify, suspend, or terminate the service at any time without notice.
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
      </main>
    </div>
  );
}
