import { constructMetadata } from '@/lib/metadata';
import HowToUse from '@/components/sections/HowToUse';
import SEOArticle from '@/components/sections/SEOArticle';
import InternalLinks from '@/components/sections/InternalLinks';
import ConversionPack from '@/components/sections/ConversionPack';
import DynamicStudio from '@/components/DynamicStudio';
import AdBanner from '@/components/AdBanner';
import { getVoices } from '@/lib/voices';
import { Sparkles, ShieldCheck, Zap, Download, Check, X } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Free Text to Speech Online — No Login, No Limits | Fish Audio',
  description: '100% free text to speech online. No login, no watermark, no limits. Generate natural AI voices free. 500+ voices, 75+ languages. Try now.',
  path: '/free-text-to-speech',
  useExactTitle: true,
  keywords: [
    "free text to speech",
    "text to speech free online",
    "free tts",
    "free voice generator",
    "text to speech no login",
    "text to speech free no signup",
    "free ai text to speech",
    "unlimited text to speech free",
    "text to speech free online no limits",
    "best free tts 2026",
    "free tts no watermark",
    "free text to speech download"
  ]
});

export default async function FreeTTSPage() {
  const initialVoices = await getVoices();

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
        "name": "Free Text to Speech",
        "item": "https://fishaudio.online/free-text-to-speech"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            <span>Zero Cost &bull; No Login Barrier &bull; No Watermarks</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
              Free text to speech, <br />
              <span className="text-muted font-normal">unlimited and unwatermarked.</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-2xl mx-auto">
              Synthesize 500+ natural neural voices online without mandatory signups or hidden download fees. Enjoy full commercial rights and crystal-clear 44.1kHz audio exports.
            </p>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-ink-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <Zap size={13} className="text-accent" />
              Instant Anonymous Generation
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <Download size={13} className="text-emerald-600" />
              Free 44.1kHz MP3 Downloads
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border shadow-xs">
              <ShieldCheck size={13} className="text-emerald-600" />
              Commercial Use Approved
            </span>
          </div>
        </section>

        {/* Studio Panel */}
        <section className="card-elevated p-2 sm:p-4 bg-surface">
          <DynamicStudio initialVoices={initialVoices} />
        </section>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Competitor Comparison Section */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink tracking-tight">
              Why Fish Audio is the Best Free TTS Platform
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              See how our generous free tier compares to industry alternatives.
            </p>
          </div>

          <div className="card overflow-hidden border border-border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-2/80">
                    <th className="p-4 sm:p-5 font-bold text-ink w-2/5">Capability</th>
                    <th className="p-4 sm:p-5 font-bold text-accent text-center w-1/5 bg-accent-light/40">Fish Audio Free</th>
                    <th className="p-4 sm:p-5 font-bold text-ink text-center w-1/5">ElevenLabs Free</th>
                    <th className="p-4 sm:p-5 font-bold text-ink text-center w-1/5">Murf Free</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr className="hover:bg-surface-2/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-ink-2">No Signup Required</td>
                    <td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-accent-light/20">
                      <span className="inline-flex items-center justify-center gap-1.5"><Check size={14} className="stroke-[2.5]" /> Yes</span>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-rose-500">
                      <span className="inline-flex items-center justify-center gap-1"><X size={13} /> Mandatory</span>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-rose-500">
                      <span className="inline-flex items-center justify-center gap-1"><X size={13} /> Mandatory</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-2/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-ink-2">Commercial Rights</td>
                    <td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-accent-light/20">
                      <span className="inline-flex items-center justify-center gap-1.5"><Check size={14} className="stroke-[2.5]" /> Included</span>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-rose-500">
                      <span className="inline-flex items-center justify-center gap-1"><X size={13} /> Non-commercial</span>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-rose-500">
                      <span className="inline-flex items-center justify-center gap-1"><X size={13} /> Personal only</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-2/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-ink-2">Batch Character Allowance</td>
                    <td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-accent-light/20">
                      <span className="inline-flex items-center justify-center gap-1.5"><Check size={14} className="stroke-[2.5]" /> Up to 10K chars</span>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-muted">10K chars / month total</td>
                    <td className="p-4 sm:p-5 text-center text-muted">10 mins total (no download)</td>
                  </tr>
                  <tr className="hover:bg-surface-2/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-ink-2">Audio Watermarks</td>
                    <td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-accent-light/20">
                      <span className="inline-flex items-center justify-center gap-1.5"><Check size={14} className="stroke-[2.5]" /> Zero Watermark</span>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-muted">None</td>
                    <td className="p-4 sm:p-5 text-center text-rose-500">
                      <span className="inline-flex items-center justify-center gap-1"><X size={13} /> Download locked</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-2/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-ink-2">Instant Voice Cloning</td>
                    <td className="p-4 sm:p-5 text-center font-bold text-emerald-600 bg-accent-light/20">
                      <span className="inline-flex items-center justify-center gap-1.5"><Check size={14} className="stroke-[2.5]" /> 15s Sample Clone</span>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-rose-500">
                      <span className="inline-flex items-center justify-center gap-1"><X size={13} /> Paid tiers only</span>
                    </td>
                    <td className="p-4 sm:p-5 text-center text-rose-500">
                      <span className="inline-flex items-center justify-center gap-1"><X size={13} /> Enterprise only</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3 Step Workflow */}
        <HowToUse />

        {/* Demos */}
        <ConversionPack />

        {/* SEO Explainer */}
        <SEOArticle 
          title="The Premier Free Voice Generator for Digital Media"
          subtitle="Delivering natural human speech without paywalls or restrictive licenses"
          content={
            <>
              <p>
                Finding an alternative to expensive subscription voice generators shouldn&apos;t mean compromising on vocal realism. Fish Audio Online delivers natural-sounding, professional <strong>free text to speech</strong> conversion that works right in your browser. By eliminating sign-up walls and credit card requirements, we empower creators to experiment freely and produce broadcast-ready voiceovers.
              </p>

              <h3>High-Fidelity Audio Without Watermarks</h3>
              <p>
                Many online TTS generators offer &ldquo;free trials&rdquo; that stamp loud watermarks across your audio or disable MP3 downloads entirely. Fish Audio provides clean, unwatermarked 44.1kHz audio files ready for direct integration into Premiere Pro, Final Cut, CapCut, DaVinci Resolve, or podcast DAWs.
              </p>

              <h3>Generous Batch Processing</h3>
              <p>
                Our synthesis engine handles up to 10,000 characters per conversion on standard scripts. Whether you are generating a 30-second TikTok voiceover or a multi-chapter narration, our neural models maintain consistent pacing and pitch from beginning to end.
              </p>
            </>
          }
        />

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Internal Interlinking */}
        <InternalLinks />

      </div>
    </main>
  );
}
