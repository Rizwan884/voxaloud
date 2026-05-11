import { constructMetadata } from '@/lib/metadata';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import StudioClient from '@/components/StudioClient';
import SEOArticle from '@/components/sections/SEOArticle';
import { getVoices } from '@/lib/voices';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Professional AI Voice Generator | Ultra-Realistic Speech',
  description: 'Generate high-fidelity AI voices instantly. Our professional AI voice generator offers 500+ human-like voices for YouTube, TikTok, and commercial projects.',
  path: '/ai-voice-generator',
});

export default async function AIVoiceGeneratorPage() {
  const initialVoices = await getVoices();

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-24 md:space-y-32">
        <section className="space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight leading-[0.95]">
              Advanced AI <br /><span className="text-muted">Voice Generator.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted/80 max-w-2xl mx-auto font-medium">
              The industry standard for neural speech synthesis. Realistic, emotive, and engineered for professional creators.
            </p>
          </div>
          <StudioClient initialVoices={initialVoices} />
        </section>

        <Features />
        
        <SEOArticle 
          title="The Evolution of Speech Synthesis"
          subtitle="From Robotic Tones to Human Emotion"
          content={
            <>
              <p>
                The landscape of digital content creation has been fundamentally transformed by the advent of the <strong>AI Voice Generator</strong>. Gone are the days of monotone, mechanical speech that broke the immersion of your audience. Today, we stand at the pinnacle of neural voice synthesis, where the line between artificial and human audio has effectively vanished.
              </p>
              
              <h3>Why Choose a Professional AI Voice Generator?</h3>
              <p>
                In an era where attention is the ultimate currency, the quality of your audio can make or break your content. A professional AI voice generator provides more than just a voice; it provides a personality. Whether you are producing a high-stakes corporate presentation, a viral TikTok, or an immersive audiobook, the nuance of the delivery is what captures and holds your audience&apos;s interest.
              </p>
              
              <ul>
                <li><strong>Unmatched Realism:</strong> Our neural models are trained on thousands of hours of human speech, capturing the subtle inflections, breaths, and pauses that make a voice sound truly alive.</li>
                <li><strong>Scalability:</strong> Generate hours of high-quality narration in minutes. What used to take days in a recording studio now takes seconds on your dashboard.</li>
                <li><strong>Cost Efficiency:</strong> Eliminate the overhead of hiring voice actors, booking studios, and managing multiple revisions. With our <Link href="/free-text-to-speech">free text to speech</Link> tools, professional quality is accessible to everyone.</li>
              </ul>

              <h3>Industry-Specific Applications</h3>
              <p>
                The versatility of our AI voice generator makes it the preferred choice across diverse industries. We provide the tools for <strong>YouTube creators</strong> looking to scale their channels, <strong>educators</strong> creating accessible learning materials, and <strong>game developers</strong> seeking unique character voices.
              </p>

              <h4>Digital Marketing & Advertising</h4>
              <p>
                Marketers use our platform to rapidly prototype ad copy and create localized versions of their campaigns. With 75+ languages supported, you can take your brand global with a single click. The ability to adjust pitch and speed means you can create a high-energy sales voice or a calm, authoritative brand voice with ease.
              </p>

              <h4>The Future of Accessibility</h4>
              <p>
                Beyond entertainment, AI voices are a critical pillar of web accessibility. By providing high-quality <Link href="/text-to-voice">text to voice</Link> conversion, we help ensure that content is inclusive for the visually impaired and those with reading difficulties. Our voices are designed to be clear and easy to understand, even at higher playback speeds.
              </p>

              <h3>Technical Excellence Behind the Sound</h3>
              <p>
                At the core of Fish Audio Online is a sophisticated neural architecture. Unlike traditional concatenative synthesis that stitches together audio snippets, our <strong>AI voice generator</strong> uses deep learning to predict the acoustic features of speech from text. This results in a much smoother, more natural flow that respects the context of your sentences.
              </p>

              <p>
                Ready to experience the future? Start your project today with our unlimited free access and find out why thousands of professionals trust us with their vocal needs.
              </p>
            </>
          }
        />

        <UseCases />
      </main>
    </div>
  );
}
