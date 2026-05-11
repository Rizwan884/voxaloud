import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'Privacy Policy | Fish Audio Online',
  description: 'Learn how we protect your data and maintain transparency in our neural speech synthesis platform.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const lastUpdated = 'May 11, 2024';

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight">
            Privacy <span className="text-muted">Policy.</span>
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
            At Fish Audio Online, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use our platform.
          </p>

          <h3>1. Data We Collect</h3>
          <p>
            We collect minimal data to ensure the performance and security of our services:
          </p>
          <ul>
            <li><strong>Usage Information:</strong> We collect non-identifiable technical data such as IP addresses, browser types, and usage patterns to optimize our infrastructure.</li>
            <li><strong>Audio Input:</strong> Text scripts provided for synthesis are processed in real-time. We do not store your scripts permanently on our servers unless specifically requested for custom model training.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>
            The information we collect is used solely to:
          </p>
          <ul>
            <li>Provide and maintain our neural speech synthesis service.</li>
            <li>Analyze usage trends to improve the quality of our AI models.</li>
            <li>Prevent abuse, spam, or malicious activity on our platform.</li>
          </ul>

          <h3>3. Cookies</h3>
          <p>
            We use essential cookies to maintain session states and store your preferences (such as selected voices). You can control cookie settings through your browser, but disabling them may limit some functionality.
          </p>

          <h3>4. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your data during transmission and processing. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h3>5. Third-Party Services</h3>
          <p>
            We may use third-party analytics and advertising partners (such as Google AdSense) to support our free service. These partners may collect information as described in their own privacy policies.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            If you have questions about this policy, please contact us at <strong>rizwanrasheed046@gmail.com</strong>.
          </p>
        </article>
      </main>
    </div>
  );
}
