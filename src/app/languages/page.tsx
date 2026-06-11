import { constructMetadata } from '@/lib/metadata';
import { getVoices } from '@/lib/voices';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Text to Speech in 75+ Languages — AI Voice Generator | Fish Audio',
  description: 'Generate AI voices in 75+ languages including English, Hindi, Arabic, Spanish, Urdu, French & more. Free multilingual text to speech. No signup required.',
  path: '/languages',
  useExactTitle: true,
  keywords: [
    "text to speech languages",
    "multilingual text to speech",
    "english text to speech",
    "hindi text to speech",
    "arabic text to speech",
    "spanish text to speech",
    "urdu text to speech",
    "75 languages tts",
    "text to speech 100 languages",
    "foreign language voice generator"
  ]
});

export default async function LanguagesPage() {
  const voices = await getVoices();
  const uniqueLanguages = Array.from(new Set(voices.map(v => v.language))).sort();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fishaudio.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Languages",
        "item": "https://fishaudio.online/languages"
      }
    ]
  };

  const featuredLanguages = [
    { title: "English Text to Speech", desc: "Generate high-fidelity English text to speech. Our voices capture British, American, Australian, and global accents for professional narration." },
    { title: "Hindi Text to Speech Free", desc: "Generate natural Hindi text to speech using our AI voice generator. Our Hindi voices sound human-like and are perfect for YouTube, e-learning, and multilingual content." },
    { title: "Arabic Voice Generator", desc: "Use our Arabic voice generator to create realistic Arabic text to speech. Perfect for business presentations, audiobooks, and localized marketing across the Middle East." },
    { title: "Urdu Text to Speech Online", desc: "Synthesize Urdu text to speech online free. Our natural Urdu voices are designed to capture regional nuances, ideal for poetry, podcasts, and media channels." },
    { title: "Spanish Text to Speech", desc: "Produce native Spanish text to speech for Spain, Mexico, and Latin America. Elevate content localization with accurate pronunciation and emotive delivery." },
    { title: "French Voice Generator", desc: "Create smooth narration with our French voice generator. Our voices capture the natural rhythm of French for learning modules, ads, and tutorials." },
    { title: "German Text to Speech", desc: "Synthesize fluent German text to speech online. Perfect for high-tech product presentations, professional ads, and European content distribution." },
    { title: "Chinese Text to Speech", desc: "Generate accurate Chinese text to speech with realistic tonal inflections. Supports Mandarin and other dialects for clean, native localization." },
    { title: "Japanese Voice Generator", desc: "Engage anime creators, game developers, and marketers with our Japanese voice generator. Synthesize clean, human-like voice AI from any text." },
    { title: "Portuguese Text to Speech", desc: "Produce clear Portuguese text to speech for Brazil and Portugal. Perfect for global brand campaigns, audiobook creators, and video games." },
    { title: "Russian Text to Speech", desc: "Synthesize natural Russian text to speech online for games, audio narration, and training modules. Emotive and natural delivery guaranteed." }
  ];

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-[1fr_300px] gap-12 items-start">
          
          {/* Main Left Content */}
          <div className="space-y-24 min-w-0">
            <header className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-black font-display text-ink uppercase tracking-tight leading-none text-left">
                Text to Speech in 75+ Languages — <br />
                <span className="text-muted text-2xl md:text-4xl">Free Multilingual AI Voice.</span>
              </h1>
              <p className="text-sm md:text-base text-muted/80 max-w-2xl font-medium leading-relaxed text-left">
                Break barriers with our diverse range of natural-sounding AI voices. Synthesize 
                <strong> multilingual text to speech</strong> in over 75 languages instantly.
              </p>
            </header>

            <div className="hidden md:block">
              <AdBanner type="728x90" />
            </div>
            <div className="md:hidden">
              <AdBanner type="320x50" />
            </div>

            {/* Normal In-Content ad unit when screen size is below 1200px */}
            <div className="block min-[1200px]:hidden p-4 border border-border bg-paper/50 rounded-2xl">
              <span className="text-[9px] font-black uppercase tracking-wider text-muted/40 block mb-1">Sponsored Ad</span>
              <AdBanner type="300x250" />
            </div>

            {/* Featured Languages Section */}
            <section className="space-y-12">
              <div className="text-left space-y-4">
                <h2 className="text-2xl md:text-4xl font-black font-display text-ink uppercase tracking-tight">Featured Languages</h2>
                <p className="text-muted/60 text-xs md:text-sm uppercase tracking-widest font-bold">Optimized for global localization</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredLanguages.map((lang, idx) => (
                  <div key={idx} className="card-surface p-8 space-y-4 border border-border/60 hover:border-ink/20 transition-all duration-300">
                    <h3 className="text-xl font-bold font-display text-ink uppercase tracking-tight">{lang.title}</h3>
                    <p className="text-sm text-muted/80 leading-relaxed font-medium">{lang.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dynamic Language Directory */}
            <section className="space-y-12">
              <div className="text-left space-y-4">
                <h2 className="text-2xl md:text-4xl font-black font-display text-ink uppercase tracking-tight">Full Language Index</h2>
                <p className="text-muted/60 text-xs md:text-sm uppercase tracking-widest font-bold">Comprehensive list of supported dialects</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uniqueLanguages.map((lang) => (
                  <div key={lang} className="card-surface p-4 flex items-center justify-center text-center hover:border-ink transition-colors cursor-default group">
                    <span className="text-[14px] font-bold text-muted group-hover:text-ink transition-colors">{lang}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="space-y-12 border-t border-border/60 pt-16">
              <div className="text-left space-y-4">
                <h2 className="text-2xl md:text-4xl font-black font-display text-ink uppercase tracking-tight">Languages FAQ</h2>
                <p className="text-muted/60 text-xs md:text-sm uppercase tracking-widest font-bold">Answers regarding translation and accents</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                <div className="card-surface p-8 space-y-2">
                  <h4 className="font-bold text-ink text-lg">Which languages does Fish Audio support for text to speech?</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    Fish Audio Online supports a vast range of <strong>text to speech languages</strong>, currently offering 
                    <strong> 75 languages tts</strong>. We are actively expanding to support <strong>text to speech 100 languages</strong> 
                    in the near future.
                  </p>
                </div>
                <div className="card-surface p-8 space-y-2">
                  <h4 className="font-bold text-ink text-lg">Is Hindi text to speech free online?</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    Yes, our <strong>hindi text to speech free</strong> converter is completely free online. Our natural Hindi voice models 
                    provide clear and native articulation for presentations, audiobooks, and ads.
                  </p>
                </div>
                <div className="card-surface p-8 space-y-2">
                  <h4 className="font-bold text-ink text-lg">Can I generate Urdu voice from text for free?</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    Absolutely. With our <strong>urdu voice generator</strong>, you can create realistic <strong>urdu text to speech online</strong> 
                    monologues and descriptions without any signup limits.
                  </p>
                </div>
                <div className="card-surface p-8 space-y-2">
                  <h4 className="font-bold text-ink text-lg">What is the best multilingual text to speech tool?</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    Fish Audio Online is widely regarded as the leading <strong>foreign language voice generator</strong>. Its 
                    robust <strong>multilingual text to speech</strong> capabilities and 500+ realistic voices ensure accurate localization.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Block */}
            <div className="bg-ink rounded-[2.5rem] p-12 text-center text-paper relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-paper/5 rounded-full blur-2xl" />
              <h2 className="text-3xl md:text-5xl font-black font-display uppercase mb-4 tracking-tight">Ready to synthesize?</h2>
              <p className="text-paper/60 mb-8 max-w-lg mx-auto font-medium">Choose from hundreds of voices and bring your text to life in any language.</p>
              <Link href="/" className="inline-flex h-14 items-center justify-center px-10 bg-paper text-ink font-bold rounded-2xl hover:scale-105 transition-transform uppercase tracking-wider text-xs">
                Go to Studio
              </Link>
            </div>

            <div className="hidden md:block pt-8">
              <AdBanner type="728x90" />
            </div>
            <div className="md:hidden pt-8">
              <AdBanner type="320x50" />
            </div>
          </div>

          {/* Sticky desktop right sidebar */}
          <aside className="hidden min-[1200px]:block sticky top-24 self-start w-[300px] space-y-4">
            <span className="text-[9px] font-black uppercase tracking-wider text-muted/40 block">Advertisement</span>
            <AdBanner type="300x600" />
          </aside>
          
        </div>
      </main>
    </div>
  );
}
