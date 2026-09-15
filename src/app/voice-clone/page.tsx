import { constructMetadata } from '@/lib/metadata';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import SEOArticle from '@/components/sections/SEOArticle';
import InternalLinks from '@/components/sections/InternalLinks';
import DynamicVoiceClone from '@/components/voice-clone/DynamicVoiceClone';
import AdBanner from '@/components/AdBanner';
import { ShieldCheck, Zap, Globe2 } from 'lucide-react';

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
    a: 'Just 10 to 30 seconds of clear speech is enough to create a usable clone. Longer, cleaner samples with minimal background noise produce the most accurate results.',
  },
  {
    q: 'Is voice cloning free?',
    a: 'Yes. Cloning a voice and generating speech with it is completely free on Fish Audio Online, with no signup, no watermark, and up to 1,000 characters per generation.',
  },
  {
    q: 'Is my cloned voice private?',
    a: 'Cloned voices are created as private models and are only used to generate audio for you. We never publish or share your voice sample with the public library.',
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
    operatingSystem: 'All',
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
      { '@type': 'HowToStep', name: 'Generate speech', text: 'Type any text (up to 1,000 characters) and generate natural speech in the cloned voice.' },
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
    <div className="min-h-screen bg-surface">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-[1fr_300px] gap-12 items-start">
          <div className="space-y-24 md:space-y-32 min-w-0">
            <section className="space-y-12">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ink/5 border border-ink/10 text-[9px] font-black uppercase tracking-[0.15em] text-ink w-fit mx-auto">
                  Free &middot; No Login &middot; Full Commercial Rights
                </div>
                <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight leading-[0.95] text-left md:text-center">
                  Clone Any Voice — <br /><span className="text-muted">Free AI Voice Cloning.</span>
                </h1>
                <p className="text-sm md:text-base text-muted/80 max-w-3xl mx-auto font-medium leading-relaxed text-left md:text-center">
                  Record or upload a short sample and our neural engine builds a private voice model in seconds.
                  Type anything and hear it spoken back in that voice — or search 1M+ community voices
                  in the Discover Library. No signup, no watermark, up to 1,000 characters per generation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card p-5 flex items-start gap-3">
                  <Zap size={18} className="text-ink shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-ink">Clone in 15 Seconds</p>
                    <p className="text-[11px] text-muted mt-1 leading-relaxed">Fast training from a single short sample.</p>
                  </div>
                </div>
                <div className="card p-5 flex items-start gap-3">
                  <Globe2 size={18} className="text-ink shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-ink">1M+ Community Voices</p>
                    <p className="text-[11px] text-muted mt-1 leading-relaxed">Search and reuse public voice models instantly.</p>
                  </div>
                </div>
                <div className="card p-5 flex items-start gap-3">
                  <ShieldCheck size={18} className="text-ink shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-ink">Private by Default</p>
                    <p className="text-[11px] text-muted mt-1 leading-relaxed">Your cloned voices are never made public.</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <AdBanner type="728x90" />
              </div>
              <div className="md:hidden">
                <AdBanner type="320x50" />
              </div>

              <DynamicVoiceClone variant="full" />
            </section>

            <div className="block min-[1200px]:hidden p-4 border border-border bg-paper/50 rounded-2xl">
              <span className="text-[9px] font-black uppercase tracking-wider text-muted/40 block mb-1">Sponsored Ad</span>
              <AdBanner type="300x250" />
            </div>

            <Features />

            <SEOArticle
              title="The Free Way to Clone Your Voice with AI"
              subtitle="Build a private neural voice model in seconds, no studio required"
              content={
                <>
                  <p>
                    <strong>AI voice cloning</strong> used to require expensive studio equipment and hours of recorded audio.
                    With Fish Audio Online&apos;s <strong>voice cloning</strong> studio, all you need is a short, clear sample —
                    10 to 30 seconds is enough to <strong>clone your voice online</strong> for free. Our neural engine analyzes
                    the pitch, pacing, and texture of the sample and builds a private voice model you can reuse for any script.
                  </p>

                  <h3>How AI Voice Cloning Works</h3>
                  <p>
                    Record directly in your browser or upload an existing audio file. Our <strong>instant voice cloning</strong>{' '}
                    pipeline trains a dedicated model from that sample in seconds — no waiting, no queue. Once trained, simply
                    type any text (up to 1,000 characters per generation) and the studio synthesizes natural speech that carries
                    your voice&apos;s unique character.
                  </p>

                  <h3>Search the Community Voice Library</h3>
                  <p>
                    Don&apos;t want to record your own sample? The <strong>Discover Library</strong> tab lets you search and
                    preview over 1 million publicly shared voice models — from narrators and podcast hosts to character voices —
                    and use any of them instantly for your own <strong>text to speech voice clone</strong> generations.
                  </p>

                  <h3>What Can You Use a Cloned Voice For?</h3>
                  <ul>
                    <li><strong>Narrate your own content</strong> without re-recording every script.</li>
                    <li><strong>Localize videos and courses</strong> into new languages while keeping your voice.</li>
                    <li><strong>Prototype voiceovers</strong> for ads, trailers, and product demos.</li>
                    <li><strong>Accessibility &amp; personalization</strong> — generate messages in a familiar, human voice.</li>
                  </ul>

                  <p>
                    All cloned voices are private by default and generated audio comes with full commercial rights —
                    no royalties, no attribution required. Try the <strong>free AI voice cloning</strong> studio above and
                    hear your voice say anything in under a minute.
                  </p>
                </>
              }
            />

            <UseCases />

            <section className="pb-12">
              <header className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-ink font-display uppercase">Voice Cloning FAQ</h2>
                <p className="text-muted/60 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">Everything you need to know</p>
              </header>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CLONE_FAQS.map((faq, i) => (
                  <div key={i} className="card-surface p-10 group hover:bg-ink hover:text-paper transition-all duration-300">
                    <h4 className="font-bold mb-4 font-display text-lg leading-snug">{faq.q}</h4>
                    <p className="text-muted group-hover:text-paper/70 text-sm leading-relaxed font-medium">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <InternalLinks />

            <div className="hidden md:block pt-8">
              <AdBanner type="728x90" />
            </div>
            <div className="md:hidden pt-8">
              <AdBanner type="320x50" />
            </div>
          </div>

          <aside className="hidden min-[1200px]:block sticky top-24 self-start w-[300px] space-y-4">
            <span className="text-[9px] font-black uppercase tracking-wider text-muted/40 block">Advertisement</span>
            <AdBanner type="300x600" />
          </aside>
        </div>
      </main>
    </div>
  );
}
