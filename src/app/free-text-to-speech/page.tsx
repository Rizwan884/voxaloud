import { constructMetadata } from '@/lib/metadata';
import HowToUse from '@/components/sections/HowToUse';
import SEOArticle from '@/components/sections/SEOArticle';
import InternalLinks from '@/components/sections/InternalLinks';
import ConversionPack from '@/components/sections/ConversionPack';
import DynamicStudio from '@/components/DynamicStudio';
import AdBanner from '@/components/AdBanner';
import { getVoices } from '@/lib/voices';

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
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-24 md:space-y-32">
        <section className="space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight leading-[0.95]">
              Free Text to Speech — <br /><span className="text-muted">No Login, No Watermark, No Limits.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Experience the best <strong>free text to speech</strong> conversion online. Synthesize 500+ natural voices instantly 
              using our <strong>text to speech free online</strong> generator. Completely free, no registration required, and full 
              commercial licensing included.
            </p>
          </div>
          <DynamicStudio initialVoices={initialVoices} />
        </section>

        <div className="hidden md:block">
          <AdBanner type="728x90" />
        </div>
        <div className="md:hidden">
          <AdBanner type="320x50" />
        </div>

        <SEOArticle 
          title="Why is Fish Audio the Best Free Text to Speech Website?"
          subtitle="A comparative look at modern speech synthesis options"
          content={
            <>
              <p>
                Finding an alternative to paid services doesn&apos;t mean compromising on quality. Fish Audio Online stands as a premier 
                <strong>free voice generator</strong> that delivers professional, natural-sounding audio with 
                <strong>text to speech free no signup</strong>. We prioritize user privacy and creative flow, which is why we offer 
                <strong>text to speech no login</strong> generation that takes seconds.
              </p>

              <h3>Free Text to Speech vs Paid — What You&apos;re Missing Out On</h3>
              <p>
                Many platforms offer a <strong>text to speech free trial</strong>, but then restrict downloads with loud watermarks or low quotas. 
                Our platform provides a true <strong>free tts no watermark</strong> solution. See how we compare below:
              </p>

              <div className="overflow-x-auto my-8 border border-border rounded-2xl">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-ink/5">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-ink uppercase tracking-wider">Features</th>
                      <th className="px-6 py-4 text-left font-bold text-ink uppercase tracking-wider">Fish Audio Free</th>
                      <th className="px-6 py-4 text-left font-bold text-ink uppercase tracking-wider">ElevenLabs Free</th>
                      <th className="px-6 py-4 text-left font-bold text-ink uppercase tracking-wider">Murf Free</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-medium text-muted">
                    <tr>
                      <td className="px-6 py-4 font-bold text-ink">No Signup Required</td>
                      <td className="px-6 py-4 text-green-600">✅ Yes</td>
                      <td className="px-6 py-4 text-red-500">❌ No</td>
                      <td className="px-6 py-4 text-red-500">❌ No</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-ink">Commercial License</td>
                      <td className="px-6 py-4 text-green-600">✅ Included</td>
                      <td className="px-6 py-4 text-red-500">❌ Non-commercial only</td>
                      <td className="px-6 py-4 text-red-500">❌ Personal only</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-ink">Character Limit</td>
                      <td className="px-6 py-4 text-green-600">✅ 10K / generation</td>
                      <td className="px-6 py-4 text-red-500">❌ 10K / month total</td>
                      <td className="px-6 py-4 text-red-500">❌ 10 mins total (no download)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-ink">Watermarks</td>
                      <td className="px-6 py-4 text-green-600">✅ None</td>
                      <td className="px-6 py-4 text-red-500">❌ Attribution required</td>
                      <td className="px-6 py-4 text-red-500">❌ Watermarked download</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-ink">Price</td>
                      <td className="px-6 py-4 text-green-600">✅ $0.00 Forever</td>
                      <td className="px-6 py-4 text-red-500">❌ Upgrades needed</td>
                      <td className="px-6 py-4 text-red-500">❌ Upgrades needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>How to Use Free Text to Speech Online — Step by Step</h3>
              <p>
                Creating audio using our <strong>free speech synthesis</strong> engine is simple and direct:
              </p>
              <ol className="list-decimal pl-6 space-y-3 my-6">
                <li><strong>Enter Your Script:</strong> Paste your content into our online text editor (up to 10K characters per block).</li>
                <li><strong>Select a Voice:</strong> Choose from our curated catalog of 500+ voices in 75+ languages.</li>
                <li><strong>Refine Output:</strong> Adjust speed and pitch parameters to achieve a <strong>free natural voice generator</strong> effect.</li>
                <li><strong>Download MP3:</strong> Click generate, preview the audio, and trigger a <strong>free text to speech download</strong> instantly.</li>
              </ol>

              <p>
                Whether you need a reliable <strong>open source tts alternative</strong>, a <strong>free tts app</strong> experience for your browser, 
                or a scalable <strong>unlimited text to speech free</strong> platform for your business, Fish Audio Online delivers 
                <strong>best free tts 2026</strong> standards with zero compromises.
              </p>
            </>
          }
        />

        <div className="w-full py-4 border-t border-b border-border/40 space-y-2 bg-paper/30 rounded-2xl p-6">
          <div className="text-[9px] font-black uppercase tracking-wider text-muted/50 text-left">Sponsored Advertisements</div>
          <AdBanner type="native" />
        </div>

        {/* Local FAQ Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold font-display text-ink uppercase tracking-tight">Free TTS FAQ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-surface p-8 space-y-2">
              <h4 className="font-bold text-ink text-lg">Is there really a completely free text to speech with no limits?</h4>
              <p className="text-muted text-sm leading-relaxed">
                Yes! Fish Audio Online offers a <strong>free tts no limit</strong> experience. You can generate files up to 10,000 characters 
                per block and perform as many conversions as your projects require with our <strong>text to speech free online no limits</strong> editor.
              </p>
            </div>
            <div className="card-surface p-8 space-y-2">
              <h4 className="font-bold text-ink text-lg">What is the best free text to speech app in 2026?</h4>
              <p className="text-muted text-sm leading-relaxed">
                Fish Audio Online is widely considered the <strong>best free tts 2026</strong> platform. It provides a browser-based, lightweight 
                <strong>free tts app</strong> environment with over 500+ realistic, human-sounding voice profiles.
              </p>
            </div>
            <div className="card-surface p-8 space-y-2">
              <h4 className="font-bold text-ink text-lg">Can I use free text to speech for commercial YouTube videos?</h4>
              <p className="text-muted text-sm leading-relaxed">
                Absolutely! Our <strong>free ai text to speech</strong> outputs are completely commercial-use friendly. You get full ownership 
                and licensing rights, making it ideal for monetized YouTube content, TikToks, and advertising.
              </p>
            </div>
            <div className="card-surface p-8 space-y-2">
              <h4 className="font-bold text-ink text-lg">Is Fish Audio free with no watermark?</h4>
              <p className="text-muted text-sm leading-relaxed">
                Yes, we guarantee a <strong>free tts no watermark</strong> download experience. The generated MP3 files are clean, high-quality, 
                and ready to be dropped straight into any editing software.
              </p>
            </div>
          </div>
        </section>

        <div className="hidden md:block">
          <AdBanner type="728x90" />
        </div>
        <div className="md:hidden">
          <AdBanner type="320x50" />
        </div>

        <HowToUse />
        <ConversionPack />

        <div className="hidden md:block">
          <AdBanner type="728x90" />
        </div>
        <div className="md:hidden">
          <AdBanner type="320x50" />
        </div>

        <InternalLinks />
      </main>
    </div>
  );
}
