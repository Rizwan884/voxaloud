import { constructMetadata } from '@/lib/metadata';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import SEOArticle from '@/components/sections/SEOArticle';
import InternalLinks from '@/components/sections/InternalLinks';
import DynamicVoiceClone from '@/components/voice-clone/DynamicVoiceClone';
import AdBanner from '@/components/AdBanner';
import { ShieldCheck, Zap, Globe2, Sparkles, ChevronDown } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'AI Voice Cloning — Clone Your Voice Free in 15 Seconds | Fish Audio',
  description: 'Clone any voice from a short audio sample and generate natural AI speech instantly. Free voice cloning tool, no login required, full commercial rights.',
  path: '/voice-clone',
  useExactTitle: true,
  keywords: [
    'ai voice cloning',
    'voice cloning free',
    'clone your voice',
    'clone voice online',
    'ai voice clone free',
    'voice cloning app',
    'text to speech voice clone',
    'instant voice cloning',
    'clone voice from audio sample',
    'voice cloning no signup',
  ],
});

const CLONE_FAQS = [
  {
    q: 'How does AI voice cloning work?',
    a: 'Our voice cloning engine analyzes a short audio sample of a voice — the tone, pitch, pacing, and unique vocal texture — and builds a private neural voice model. Once trained, you can type any text and generate new speech that sounds like that voice, in seconds.',
  },
  {
    q: 'How much audio do I need to clone a voice?',
    a: 'Just 10 to 30 seconds of clear speech is enough to create a high-quality clone. Longer, cleaner samples with minimal background noise produce the most accurate results.',
  },
  {
    q: 'Is voice cloning free?',
    a: 'Yes. Cloning a voice and generating speech with it is completely free on Fish Audio Online, with no signup, no watermark, and up to 25,000 characters per generation.',
  },
  {
    q: 'Is my cloned voice private?',
    a: 'Cloned voices are created as private models and are only used to generate audio for you. We never publish or share your voice sample with the public library without your permission.',
  },
  {
    q: 'Can I search and use other people’s public voices?',
    a: 'Yes — the Discover Library tab lets you search over 1 million community-shared voice models and use any of them instantly for your own text to speech generations.',
  },
  {
    q: 'What can I use a cloned voice for?',
    a: 'Cloned voices are perfect for narrating your own videos and podcasts in your own voice, localizing content, prototyping voiceovers, accessibility, and creating personalized audio messages — all with full commercial rights.',
  },
];

export default function VoiceClonePage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fish Audio Voice Cloning Studio',
    operatingSystem: 'Web, iOS, Android',
    applicationCategory: 'MultimediaApplication',
    offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
    description: 'Free AI voice cloning tool. Clone any voice from a short sample and generate natural text to speech with it instantly.',
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to clone a voice with AI',
    step: [
      { '@type': 'HowToStep', name: 'Record or upload a sample', text: 'Record 10-30 seconds of clear speech, or upload an existing audio file.' },
      { '@type': 'HowToStep', name: 'Name your voice', text: 'Give your new voice model a name so you can find it later.' },
      { '@type': 'HowToStep', name: 'Clone it', text: 'Our AI trains a private voice model from your sample in seconds.' },
      { '@type': 'HowToStep', name: 'Generate speech', text: 'Type any text (up to 25,000 characters) and generate natural speech in the cloned voice.' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CLONE_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fishaudio.online' },
      { '@type': 'ListItem', position: 2, name: 'Voice Cloning', item: 'https://fishaudio.online/voice-clone' },
    ],
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            <span>Zero-Shot Cloning &bull; No Login Required &bull; Commercial Rights</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
              Clone any voice <br />
              <span className="text-muted font-normal">in 15 seconds.</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-2xl mx-auto">
              Record or upload a short audio clip. Our neural engine trains a dedicated, private voice model in moments so you can generate natural speech for any script — or explore 1M+ community voices in the Discover Library.
            </p>
          </div>

          {/* Quick Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
            <div className="card p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent-light text-accent flex items-center justify-center shrink-0">
                <Zap size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">15-Second Zero-Shot</p>
                <p className="text-[11px] text-muted mt-0.5">Fast synthesis from a single short audio clip.</p>
              </div>
            </div>

            <div className="card p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-surface-2 text-ink flex items-center justify-center shrink-0">
                <Globe2 size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">1M+ Discover Library</p>
                <p className="text-[11px] text-muted mt-0.5">Search and reuse public voice models instantly.</p>
              </div>
            </div>

            <div className="card p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink">Private & Encrypted</p>
                <p className="text-[11px] text-muted mt-0.5">Your cloned voice models remain private to you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Interactive Voice Clone Studio */}
        <section className="card-elevated p-2 sm:p-4 bg-surface">
          <DynamicVoiceClone variant="full" />
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Features Bento */}
        <Features />

        {/* Detailed SEO Explainer Article */}
        <SEOArticle
          title="The Free, Professional Way to Clone Your Voice with AI"
          subtitle="Build a private neural voice model in seconds, without expensive studio hardware"
          content={
            <>
              <p>
                <strong>AI voice cloning</strong> previously required specialized audio recording setups, hundreds of recorded sentences, and hours of compute. With Fish Audio Online&apos;s <strong>zero-shot voice cloning studio</strong>, all you need is a short, clear 15-second speech sample to <strong>clone your voice online for free</strong>. Our neural engine analyzes the acoustic timbre, pitch variations, rhythm, and unique vocal texture to synthesize a responsive, private voice model.
              </p>

              <h3>How the Zero-Shot Pipeline Works</h3>
              <p>
                Record your voice directly inside your web browser or upload a pre-recorded WAV or MP3 clip. Our <strong>instant voice cloning</strong> pipeline extracts embedding vectors in seconds. Once compiled, type any script (up to 25,000 characters per batch on the free tier) and listen as natural, human-grade speech is synthesized with your authentic tone.
              </p>

              <h3>Accessing the 1M+ Community Discover Library</h3>
              <p>
                Need a specific persona, character, or accent? The <strong>Discover Library</strong> tab gives you direct access to search over 1 million public voice models shared by the community — spanning dynamic narrators, animated characters, podcast hosts, and global accents.
              </p>

              <h3>Commercial Applications & Content Creation</h3>
              <ul>
                <li><strong>YouTube, Shorts & TikTok Narration:</strong> Narrate high-volume scripts without re-recording in front of a microphone.</li>
                <li><strong>Podcast Editing & Pickups:</strong> Patch audio mistakes or add sponsor mentions seamlessly in your own voice.</li>
                <li><strong>Localization & Dubbing:</strong> Expand your reach across 75+ global languages while preserving your vocal identity.</li>
                <li><strong>Commercial Freedom:</strong> All synthesized outputs come with full commercial rights — zero royalties, zero attribution required.</li>
              </ul>
            </>
          }
        />

        {/* Use Cases */}
        <UseCases />

        {/* Accordion FAQ */}
        <section className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink tracking-tight">
              Voice Cloning FAQ
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Frequently asked questions about audio samples, privacy, and commercial rights.
            </p>
          </div>

          <div className="space-y-3">
            {CLONE_FAQS.map((faq) => (
              <details 
                key={faq.q} 
                className="group card p-5 sm:p-6 transition-all duration-200 open:border-accent/40"
              >
                <summary className="font-semibold text-sm sm:text-base text-ink font-display cursor-pointer list-none flex items-center justify-between gap-3">
                  <span>{faq.q}</span>
                  <span className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-muted shrink-0 group-open:rotate-180 transition-transform">
                    <ChevronDown size={15} />
                  </span>
                </summary>
                <p className="pt-3 text-xs sm:text-sm text-muted leading-relaxed border-t border-border/60 mt-3 font-normal">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Internal Links for SEO Interlinking */}
        <InternalLinks />

      </div>
    </main>
  );
}
