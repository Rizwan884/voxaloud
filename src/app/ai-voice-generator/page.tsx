import { constructMetadata } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import StudioClient from '@/components/StudioClient';
import { getVoices } from '@/lib/voices';

export const metadata = constructMetadata({
  title: 'Professional AI Voice Generator',
  description: 'Create high-quality, professional AI voices with our advanced generator. Perfect for videos, games, and digital content.',
  path: '/ai-voice-generator',
});

export default async function AIVoiceGeneratorPage() {
  const initialVoices = await getVoices();

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-24 md:space-y-32">
        <section>
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink mb-6 text-center">
            Professional AI Voice Generator
          </h1>
          <p className="text-lg text-muted text-center max-w-2xl mx-auto mb-12">
            Experience the next generation of voice synthesis. Realistic, emotive, and ready for your professional projects.
          </p>
          <StudioClient initialVoices={initialVoices} />
        </section>

        <Features />
        <UseCases />
      </main>
    </div>
  );
}
