import { constructMetadata } from '@/lib/metadata';
import { getVoices } from '@/lib/voices';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Supported Languages & Accents',
  description: 'Explore our global library of AI voices covering 50+ languages and regional accents. Find the perfect voice for any audience.',
  path: '/languages',
});

export default async function LanguagesPage() {
  const voices = await getVoices();
  const uniqueLanguages = Array.from(new Set(voices.map(v => v.language))).sort();

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-24 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink">
            Global AI Voices
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Break language barriers with our diverse range of natural-sounding AI voices in over 50 languages.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uniqueLanguages.map((lang) => (
            <div key={lang} className="card-surface p-4 flex items-center justify-center text-center hover:border-ink transition-colors cursor-default group">
              <span className="text-[14px] font-bold text-muted group-hover:text-ink transition-colors">{lang}</span>
            </div>
          ))}
        </div>

        <div className="bg-ink rounded-[2rem] p-12 text-center text-paper">
          <h2 className="text-3xl font-bold font-display mb-4">Ready to start generating?</h2>
          <p className="text-paper/60 mb-8 max-w-lg mx-auto">Choose from hundreds of voices and bring your text to life in any language.</p>
          <Link href="/" className="inline-flex h-12 items-center justify-center px-8 bg-paper text-ink font-bold rounded-xl hover:scale-105 transition-transform">
            Go to Studio
          </Link>
        </div>
      </main>
    </div>
  );
}
