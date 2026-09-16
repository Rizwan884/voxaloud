import { constructMetadata } from '@/lib/metadata';
import { getVoices } from '@/lib/voices';
import Link from 'next/link';
import { Globe2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import InternalLinks from '@/components/sections/InternalLinks';
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
    { code: 'EN', title: "English Text to Speech", flag: "🇺🇸", desc: "Generate high-fidelity English text to speech. Our voices capture British, American, Australian, and global accents for professional narration." },
    { code: 'HI', title: "Hindi Text to Speech Free", flag: "🇮🇳", desc: "Generate natural Hindi text to speech using our AI voice generator. Sounds human-like and is perfect for YouTube, e-learning, and regional dubbing." },
    { code: 'AR', title: "Arabic Voice Generator", flag: "🇸🇦", desc: "Create realistic Arabic text to speech. Ideal for business presentations, audiobooks, and localized marketing across the Middle East." },
    { code: 'UR', title: "Urdu Text to Speech Online", flag: "🇵🇰", desc: "Synthesize Urdu text to speech online free. Natural Urdu voices designed to capture regional cadence, ideal for poetry, podcasts, and media." },
    { code: 'ES', title: "Spanish Text to Speech", flag: "🇪🇸", desc: "Produce native Spanish text to speech for Spain, Mexico, and Latin America. Accurate pronunciation and emotive delivery." },
    { code: 'FR', title: "French Voice Generator", flag: "🇫🇷", desc: "Smooth narration with our French voice generator. Captures the natural rhythm of French for learning modules, ads, and video essays." },
    { code: 'DE', title: "German Text to Speech", flag: "🇩🇪", desc: "Fluent German text to speech online. Perfect for high-tech product presentations, professional ads, and European content distribution." },
    { code: 'ZH', title: "Chinese Text to Speech", flag: "🇨🇳", desc: "Generate accurate Chinese text to speech with realistic tonal inflections. Supports Mandarin and regional variations." },
    { code: 'JA', title: "Japanese Voice Generator", flag: "🇯🇵", desc: "Engage anime creators, game developers, and marketers with clean, emotive Japanese neural voice synthesis." },
    { code: 'PT', title: "Portuguese Text to Speech", flag: "🇧🇷", desc: "Produce clear Portuguese text to speech for Brazil and Portugal. Perfect for global brand campaigns and audiobooks." },
    { code: 'RU', title: "Russian Text to Speech", flag: "🇷🇺", desc: "Natural Russian text to speech online for games, video narration, and training modules with authentic accentuation." },
    { code: 'IT', title: "Italian Voice Synthesis", flag: "🇮🇹", desc: "Warm, expressive Italian speech synthesis tailored for audiobooks, travel content, and commercial voiceovers." }
  ];

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* Header */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Globe2 size={13} className="text-accent" />
            <span>Multilingual Neural Synthesis &bull; 75+ Languages &bull; Global Accents</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
            Text to speech in 75+ languages, <br />
            <span className="text-muted font-normal">synthesized naturally.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-2xl mx-auto">
            Break language barriers with our diverse range of natural AI voices. Localize videos, podcasts, and digital experiences with authentic accents and cadence.
          </p>

          <div className="pt-2">
            <Link href="/" className="btn-accent !px-6 !py-3 !text-xs !font-semibold">
              <Sparkles size={14} />
              <span>Open Multilingual Studio</span>
            </Link>
          </div>
        </header>

        {/* Featured Languages Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink tracking-tight">
              Featured Global Languages
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Optimized for high-fidelity regional inflection, natural breath, and commercial delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredLanguages.map((lang) => (
              <div 
                key={lang.title} 
                className="card p-6 flex flex-col justify-between space-y-4 hover:border-accent/40 group transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface-2 text-muted border border-border">
                      {lang.code}
                    </span>
                  </div>
                  <h3 className="text-base font-bold font-display text-ink group-hover:text-accent transition-colors">
                    {lang.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                    {lang.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <Link 
                    href="/" 
                    className="text-xs font-semibold text-muted group-hover:text-ink flex items-center gap-1 transition-colors"
                  >
                    <span>Generate in {lang.title.split(' ')[0]}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* All Available Languages Cloud */}
        <section className="card p-8 sm:p-10 space-y-6 bg-surface-2/60">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-ink">
              All Available Languages in Fish Audio ({uniqueLanguages.length})
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              Click any language to load corresponding neural voice profiles directly in the Studio.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {uniqueLanguages.map((lang) => (
              <Link
                key={lang}
                href="/"
                className="px-3 py-1.5 rounded-xl bg-surface border border-border hover:border-accent hover:text-accent text-xs font-medium text-ink-2 transition-all shadow-2xs"
              >
                {lang}
              </Link>
            ))}
          </div>
        </section>

        {/* Educational SEO Details */}
        <section className="space-y-6 max-w-4xl mx-auto text-muted text-sm leading-relaxed">
          <h2 className="text-2xl font-bold font-display text-ink">
            Why Multilingual Neural AI Voice Matters for Creators
          </h2>
          <p>
            Traditional voice acting for multilingual localization is prohibitively expensive and time-consuming. With Fish Audio&apos;s neural text-to-speech engine, creators can synthesize content in over 75 languages in real-time. Whether you are translating an English YouTube channel into Spanish, producing training material in Hindi and Arabic, or localizing an indie video game into Japanese, our engine preserves emotional weight and phonetic accuracy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="card p-5 space-y-2">
              <h4 className="font-bold text-ink text-sm flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Native Dialect Intonation
              </h4>
              <p className="text-xs text-muted">
                Trained on native voice datasets to accurately reproduce diphthongs, tone inflections, and authentic pauses.
              </p>
            </div>
            <div className="card p-5 space-y-2">
              <h4 className="font-bold text-ink text-sm flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Commercial Rights Across Borders
              </h4>
              <p className="text-xs text-muted">
                Synthesized audio files carry unrestricted worldwide commercial rights for broadcasts, ads, and digital publishing.
              </p>
            </div>
          </div>
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Internal Interlinking */}
        <InternalLinks />

      </div>
    </main>
  );
}
