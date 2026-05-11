import { constructMetadata } from '@/lib/metadata';
import FAQ from '@/components/sections/FAQ';

export const metadata = constructMetadata({
  title: 'Frequently Asked Questions',
  description: 'Everything you need to know about Fish Audio. From technical limits to commercial rights and voice quality.',
  path: '/faq',
});

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-24 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Find quick answers to common questions about our AI voice generation technology.
          </p>
        </header>

        <FAQ />
      </main>
    </div>
  );
}
