import StudioClient from '@/components/StudioClient';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import InfoBlock from '@/components/sections/InfoBlock';
import HowToUse from '@/components/sections/HowToUse';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import AdBanner from '@/components/AdBanner';
import { getVoices } from '@/lib/voices';

export default async function Home() {
  const initialVoices = await getVoices();

  return (
    <div className="min-h-screen bg-surface selection:bg-ink/10 flex flex-col">
      <div className="flex-1 space-y-24 md:space-y-32 pb-20">
        
        {/* Main Studio Area */}
        <main className="max-w-6xl w-full mx-auto px-4 md:px-6 py-8 md:py-12 dot-grid">
           <div className="space-y-8">
              <Hero />
              <StudioClient initialVoices={initialVoices} />
           </div>
        </main>

        <div className="max-w-6xl w-full mx-auto px-4 md:px-6 space-y-24 md:space-y-32">
          <Stats />

          <div className="hidden md:block">
            <AdBanner type="728x90" />
          </div>
          <div className="md:hidden">
            <AdBanner type="320x50" />
          </div>

          <InfoBlock />

          <div className="w-full">
            <AdBanner type="native" />
          </div>

          <HowToUse />

          <div className="hidden md:block">
            <AdBanner type="728x90" />
          </div>
          <div className="md:hidden">
            <AdBanner type="320x50" />
          </div>

          <Features />

          <div className="w-full">
            <AdBanner type="native" />
          </div>

          <UseCases />

          <FAQ />
          <CTA />
        </div>

        <div className="mt-12 hidden md:block">
          <AdBanner type="468x60" />
        </div>
        <div className="mt-12 md:hidden">
          <AdBanner type="320x50" />
        </div>
      </div>
    </div>
  );
}
