import { constructMetadata } from '@/lib/metadata';
import UseCases from '@/components/sections/UseCases';
import Features from '@/components/sections/Features';
import { ShieldCheck, Scale, Globe } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'AI Voices for Commercial Use',
  description: 'Use our AI generated voices for your commercial projects, YouTube videos, and advertisements without copyright worries.',
  path: '/commercial-use',
});

export default function CommercialUsePage() {
  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-24 space-y-24">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink">
            AI Voices for Commercial Use
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Scale your content production with confidence. Our voices are designed for professional and commercial applications.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck className="w-8 h-8 text-ink" />, title: 'Full Ownership', desc: 'You own the audio you generate. Perfect for monetization.' },
            { icon: <Scale className="w-8 h-8 text-ink" />, title: 'No Royalties', desc: 'Generate as much as you need without recurring royalty fees.' },
            { icon: <Globe className="w-8 h-8 text-ink" />, title: 'Global Rights', desc: 'Use your generated audio anywhere in the world, on any platform.' }
          ].map((item, i) => (
            <div key={i} className="card-surface p-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center border border-border shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-ink font-display">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <UseCases />
        <Features />
      </main>
    </div>
  );
}
