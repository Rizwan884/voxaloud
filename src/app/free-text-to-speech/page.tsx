import { constructMetadata } from '@/lib/metadata';
import HowToUse from '@/components/sections/HowToUse';
import Stats from '@/components/sections/Stats';
import StudioClient from '@/components/StudioClient';
import SEOArticle from '@/components/sections/SEOArticle';
import { getVoices } from '@/lib/voices';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: '100% Free Text to Speech Online | No Sign Up Required',
  description: 'Convert text to speech for free with Fish Audio. No hidden costs, no registration required. Professional-grade AI voices for everyone.',
  path: '/free-text-to-speech',
});

export default async function FreeTTSPage() {
  const initialVoices = await getVoices();

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-24 md:space-y-32">
        <section className="space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight leading-[0.95]">
              Free Text to <br /><span className="text-muted">Speech Online.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted/80 max-w-2xl mx-auto font-medium">
              Breaking the barriers to professional audio. High-fidelity voice generation accessible to every creator, everywhere.
            </p>
          </div>
          <StudioClient initialVoices={initialVoices} />
        </section>

        <Stats />
        
        <SEOArticle 
          title="Democratizing Voice Technology"
          subtitle="Why Free Access Matters for Modern Creators"
          content={
            <>
              <p>
                In the rapidly evolving digital landscape, <strong>Free Text to Speech</strong> has become more than just a convenience—it is a necessity. For too long, high-quality neural voiceovers were locked behind expensive subscriptions and complex licensing agreements. Fish Audio Online was founded on a simple principle: that the power of AI voice synthesis should be in the hands of everyone, regardless of their budget.
              </p>
              
              <h3>The Value of Barrier-Free Generation</h3>
              <p>
                When we say free, we mean it. Many platforms offer "free" trials that expire after a few hundred words or require a credit card for "verification." Our <strong>free text to speech</strong> engine requires no registration, no login, and no payment information. This allows you to stay in your creative flow without interruptions.
              </p>
              
              <ul>
                <li><strong>No Creative Limits:</strong> Generate as many files as you need. Whether it&apos;s a 5-second notification sound or a 10,000-character script, our engine is ready to perform.</li>
                <li><strong>Professional Standards:</strong> Just because it&apos;s free doesn&apos;t mean it sounds cheap. We use the same advanced neural networks as paid enterprise solutions, ensuring that every word is delivered with clarity and natural emotion.</li>
                <li><strong>Total Commercial Rights:</strong> We believe that if you generate audio on our platform, you should own it. Use your files for YouTube, advertisements, or even sold products without paying us a cent in royalties.</li>
              </ul>

              <h3>Empowering the Independent Creator</h3>
              <p>
                From indie game developers to solo YouTubers, the cost of production can be a major hurdle. By providing a professional <Link href="/ai-voice-generator">AI voice generator</Link> at no cost, we enable creators to compete on a level playing field. You can now produce content that sounds just as professional as a major studio production.
              </p>

              <h4>Educational Equity</h4>
              <p>
                Our <strong>free text to speech</strong> tools are widely used in the academic world. Students use them to listen to their essays for better proofreading, and teachers use them to create multi-modal learning materials that cater to different learning styles. Accessibility should not be a premium feature.
              </p>

              <h4>Social Media & Content Scaling</h4>
              <p>
                If you are managing multiple TikTok or Instagram accounts, you know how time-consuming it is to record voiceovers for every clip. Our <Link href="/text-to-voice">text to voice</Link> technology allows you to batch-produce audio for weeks of content in a single afternoon, allowing you to focus on strategy and visual storytelling.
              </p>

              <h3>How We Maintain Quality Without the Cost</h3>
              <p>
                You might wonder how we can offer such high-end technology for free. We utilize optimized server clusters and efficient neural architectures that minimize the computational cost of each generation. This efficiency is passed directly to you, the user, in the form of a fast, free, and reliable service.
              </p>

              <p>
                Join the revolution in digital audio. Start using Fish Audio Online today and discover why we are the world&apos;s most trusted source for free neural speech synthesis.
              </p>
            </>
          }
        />

        <HowToUse />
      </main>
    </div>
  );
}
