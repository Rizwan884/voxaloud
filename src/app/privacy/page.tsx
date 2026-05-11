import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-paper py-12 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-ink transition-colors mb-12 group">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-1 transition-transform">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Studio
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-ink mb-4">Privacy Policy</h1>
          <p className="text-muted font-medium">Last Updated: April 2026</p>
        </header>

        <div className="prose prose-slate max-w-none space-y-8 text-muted leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ink font-display">1. Introduction</h2>
            <p>
              Welcome to Fish Audio Online. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our AI Text-to-Speech service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ink font-display">2. Information Collection</h2>
            <p>
              <strong>Text Inputs:</strong> We process the text you provide to generate audio. This data is processed in real-time and is not stored on our servers after the generation process is completed.
            </p>
            <p>
              <strong>Local History:</strong> Your generation history is stored exclusively in your browser&apos;s Local Storage. We do not have access to this data on our servers.
            </p>
            <p>
              <strong>Technical Data:</strong> We may collect anonymous data such as IP addresses, browser types, and usage patterns to ensure the security and performance of our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ink font-display">3. Third-Party Services</h2>
            <p>
              We utilize third-party services to provide core functionality:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Speechma:</strong> Used as our underlying TTS engine provider.</li>
              <li><strong>Adsterra:</strong> Used for displaying advertisements to keep our service free.</li>
              <li><strong>GitHub:</strong> Used for hosting static assets and voice configuration files.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ink font-display">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. Since we do not require registration, we do not store sensitive personal information like names, emails, or passwords.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ink font-display">5. Cookies & Local Storage</h2>
            <p>
              Fish Audio Online uses Local Storage to remember your preferences (such as the last voice used) and to keep a record of your recent audio generations. You can clear this data at any time through your browser settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ink font-display">6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ink font-display">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our support team through the official support channels.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
