import { constructMetadata } from '@/lib/metadata';
import HowToUse from '@/components/sections/HowToUse';
import Stats from '@/components/sections/Stats';
import StudioClient from '@/components/StudioClient';
import { getVoices } from '@/lib/voices';

export const metadata = constructMetadata({
  title: '100% Free Text to Speech Online',
  description: 'Convert text to speech for free with Fish Audio. No hidden costs, no registration required. High-quality AI voices at your fingertips.',
  path: '/free-text-to-speech',
});

export default async function FreeTTSPage() {
  const initialVoices = await getVoices();

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-24 md:space-y-32">
        <section>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink mb-6 text-center">
            Free Text to Speech Online
          </h1>
          <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-12">
            High-quality voice generation shouldn&apos;t cost a fortune. Enjoy our powerful AI voices completely free of charge.
          </p>
          <StudioClient initialVoices={initialVoices} />
        </section>

        <Stats />
        <HowToUse />
      </main>
    </div>
  );
}
