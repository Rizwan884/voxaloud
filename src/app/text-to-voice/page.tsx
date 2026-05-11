import { constructMetadata } from '@/lib/metadata';
import InfoBlock from '@/components/sections/InfoBlock';
import StudioClient from '@/components/StudioClient';
import SEOArticle from '@/components/sections/SEOArticle';
import { getVoices } from '@/lib/voices';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'Instant Text to Voice Conversion | Neural Speech Synthesis',
  description: 'Transform your written text into realistic human-like voices instantly. The most advanced text to voice technology for professional creators and businesses.',
  path: '/text-to-voice',
});

export default async function TextToVoicePage() {
  const initialVoices = await getVoices();

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-24 md:space-y-32">
        <section className="space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight leading-[0.95]">
              Instant Text to <br /><span className="text-muted">Voice Conversion.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted/80 max-w-2xl mx-auto font-medium">
              Precision engineering for every syllable. High-fidelity neural conversion that respects the nuance of your script.
            </p>
          </div>
          <StudioClient initialVoices={initialVoices} />
        </section>

        <InfoBlock />
        
        <SEOArticle 
          title="The Science of Conversion"
          subtitle="How Neural Networks Master the Art of Speech"
          content={
            <>
              <p>
                At its core, <strong>Text to Voice</strong> conversion is the bridge between the written word and the human ear. It is an intricate process of translating static text into a dynamic, rhythmic, and emotive audio experience. At Fish Audio Online, we don&apos;t just read your text—we perform it. Our technology is designed to understand the underlying structure of your language, ensuring that the final output sounds like it was recorded in a studio by a professional narrator.
              </p>
              
              <h3>The Neural Conversion Pipeline</h3>
              <p>
                Modern <strong>text to voice</strong> technology has moved beyond the simple "text-to-speech" engines of the past. Our pipeline involves multiple layers of neural analysis to ensure peak realism:
              </p>
              
              <ul>
                <li><strong>Text Normalization:</strong> Our engine correctly interprets abbreviations, dates, and currency symbols, ensuring they are spoken exactly as a human would.</li>
                <li><strong>Phonetic Analysis:</strong> We analyze the phonetic breakdown of every word, managing complex pronunciations and regional variations across 75+ languages.</li>
                <li><strong>Acoustic Modeling:</strong> This is where the magic happens. Our models predict the spectral features of the voice, capturing the unique timbre and resonance of the selected speaker.</li>
              </ul>

              <h3>Why Performance Matters</h3>
              <p>
                In a world saturated with digital content, the "feel" of a voice is just as important as the clarity. A robotic voice sends a signal of low quality to your audience. By using our advanced <Link href="/ai-voice-generator">AI voice generator</Link>, you are investing in the credibility of your brand. Our voices carry the weight and authority required for corporate training, the excitement needed for gaming, and the warmth essential for storytelling.
              </p>

              <h4>Accessibility & Inclusion</h4>
              <p>
                <strong>Text to voice</strong> conversion is a transformative tool for accessibility. We help businesses and creators make their content available to everyone, including the 285 million people worldwide who are visually impaired. By providing high-quality, <Link href="/free-text-to-speech">free text to speech</Link> options, we ensure that inclusion is never a budget-line item.
              </p>

              <h4>Localized Content Strategy</h4>
              <p>
                Going global requires more than just translation; it requires localization. Our platform allows you to convert text into voices with authentic local accents. Whether you need a British English narrator for a documentary or a Brazilian Portuguese voice for a social media campaign, we provide the authentic vocal texture that builds trust with local audiences.
              </p>

              <h3>Integration with Modern Workflows</h3>
              <p>
                We designed our <strong>text to voice</strong> studio to fit perfectly into your existing production workflow. Download your audio in standard MP3 formats that are compatible with every major video editor, from Adobe Premiere Pro to DaVinci Resolve. The speed of our conversion means you can iterate on your scripts in real-time, hearing the changes instantly and refining your delivery until it&apos;s perfect.
              </p>

              <p>
                Experience the power of neural conversion for yourself. Use the studio above to transform your next script and see why Fish Audio Online is the gold standard for text-to-voice technology.
              </p>
            </>
          }
        />
      </main>
    </div>
  );
}
