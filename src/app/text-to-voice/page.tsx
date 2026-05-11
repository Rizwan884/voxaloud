import { constructMetadata } from '@/lib/metadata';
import InfoBlock from '@/components/sections/InfoBlock';
import StudioClient from '@/components/StudioClient';
import { getVoices } from '@/lib/voices';

export const metadata = constructMetadata({
  title: 'Instant Text to Voice Conversion',
  description: 'Transform your written text into realistic human-like voices instantly. The most advanced text to voice technology available online.',
  path: '/text-to-voice',
});

export default async function TextToVoicePage() {
  const initialVoices = await getVoices();

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-24 md:space-y-32">
        <section>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink mb-6 text-center">
            Instant Text to Voice Conversion
          </h1>
          <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-12">
            Turn your scripts into audio in seconds. Our AI technology ensures every word sounds natural and engaging.
          </p>
          <StudioClient initialVoices={initialVoices} />
        </section>

        <InfoBlock />
      </main>
    </div>
  );
}
