import { constructMetadata } from '@/lib/metadata';
import Features from '@/components/sections/Features';
import UseCases from '@/components/sections/UseCases';
import SEOArticle from '@/components/sections/SEOArticle';
import InternalLinks from '@/components/sections/InternalLinks';
import ConversionPack from '@/components/sections/ConversionPack';
import DynamicStudio from '@/components/DynamicStudio';
import AdBanner from '@/components/AdBanner';
import { getVoices } from '@/lib/voices';

export const metadata = constructMetadata({
  title: 'Free AI Voice Generator — 500+ Natural Neural Voices | Fish Audio',
  description: 'The best free AI voice generator online. Choose from 500+ natural neural voices. No login needed. Perfect for YouTube, TikTok, podcasts & more.',
  path: '/ai-voice-generator',
  useExactTitle: true,
  keywords: [
    "ai voice generator",
    "ai voice generator free",
    "best ai voice generator",
    "free ai voice generator",
    "ai voice online",
    "text to speech ai",
    "voice generator",
    "ai narrator",
    "voice synthesis",
    "neural voice generator",
    "ai voice 2026"
  ]
});

export default async function AIVoiceGeneratorPage() {
  const initialVoices = await getVoices();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Fish Audio AI Voice Generator",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Free AI voice generator online. Choose from 500+ natural neural voices for YouTube, TikTok, podcasts, and commercial use with no login required."
  };

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
        "name": "AI Voice Generator",
        "item": "https://fishaudio.online/ai-voice-generator"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* CSS Grid layout for Sidebar */}
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-[1fr_280px] gap-12 items-start">
          
          {/* Main Left Content */}
          <div className="space-y-24 md:space-y-32 min-w-0">
            <section className="space-y-12">
              <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight leading-[0.95] text-left">
                  Free AI Voice Generator — <br /><span className="text-muted">Natural Neural Voices.</span>
                </h1>
                <p className="text-sm md:text-base text-muted/80 max-w-3xl font-medium leading-relaxed text-left">
                  Welcome to Fish Audio&apos;s AI voice generator — the most advanced free text to speech platform available online. 
                  Generate realistic AI voices from any text in seconds. Whether you need an AI narrator for YouTube, a natural voice for 
                  your podcast, or a commercial voiceover for your business, our 500+ premium neural voices have you covered. No login, no limits.
                </p>
              </div>
              <DynamicStudio initialVoices={initialVoices} />
            </section>

            {/* Normal In-Content ad unit when screen size is below 1200px */}
            <div className="block min-[1200px]:hidden p-4 border border-border bg-paper/50 rounded-2xl">
              <span className="text-[9px] font-black uppercase tracking-wider text-muted/40 block mb-1">Sponsored Ad</span>
              <AdBanner type="300x250" />
            </div>

            <Features />
            
            <SEOArticle 
              title="Best AI Voice Generator for Content Creators"
              subtitle="Unlocking professional-grade voice synthesis with neural networks"
              content={
                <>
                  <p>
                    The search for the <strong>best AI voice generator</strong> ends here. With Fish Audio Online, you get access to a 
                    premium <strong>free AI voice generator</strong> that requires no registrations or subscriptions. Our technology is 
                    designed to let you produce natural-sounding <strong>AI voice online</strong> files without the complexity of traditional 
                    studios. It is the ultimate utility for creators who want to scale their content pipelines efficiently.
                  </p>
                  
                  <h3>Why Use an AI Voice Generator?</h3>
                  <p>
                    A high-quality <strong>voice generator</strong> does more than translate text to audio; it adds character, emotion, 
                    and context. Traditional text-to-speech tools sounded robotic and flat. With modern <strong>voice synthesis</strong> and 
                    <strong>neural voice generator</strong> models, the synthesized audio sounds indistinguishable from real human speech. 
                    Whether you need a compelling <strong>AI narrator</strong> for educational guides or professional ads, our tool provides 
                    the variety you need.
                  </p>
                  
                  <h3>AI Voice Generator Features</h3>
                  <p>
                    Our platform stands out by offering robust capabilities completely free. By using Fish Audio Online, you get the benefit of 
                    <strong>AI voice generator no login</strong> and <strong>AI voice generator free online</strong> generation. We leverage 
                    sophisticated models to offer:
                  </p>
                  <ul>
                    <li><strong>High-Fidelity Audio:</strong> Synthesized outputs in clear, studio-grade 44kHz quality.</li>
                    <li><strong>No Restrictions:</strong> Fully functional <strong>AI voice without signup</strong> with high character limits.</li>
                    <li><strong>Commercial Rights:</strong> Keep and use all generated files commercially without royalty concerns.</li>
                    <li><strong>Modern Models:</strong> Enjoy advanced <strong>free AI voice 2026</strong> neural synthesis for perfect pronunciation.</li>
                  </ul>

                  <h3>AI Voice for YouTube, TikTok & Podcasts</h3>
                  <p>
                    Content creators are constantly looking for the best audio solutions. If you run a faceless channel, finding the 
                    <strong>best AI voice generator for YouTube</strong> is critical to keep your audience engaged. Similarly, having a 
                    reliable <strong>AI voice for TikTok</strong> helps generate viral clips in seconds. 
                    With Fish Audio, you can customize your narrator style, speed, and pitch to create engaging <strong>AI text to speech free</strong> 
                    tracks for podcasts, reels, shorts, and corporate training videos.
                  </p>
                  
                  <p>
                    Ready to transform your scripts into engaging speech? Try our premium <strong>text to speech AI</strong> tools and start 
                    generating lifelike voiceovers today. No credit cards, no logins — just open the studio and bring your stories to life.
                  </p>
                </>
              }
            />

            <UseCases />
            <ConversionPack />
            <InternalLinks />
          </div>

          {/* Sticky desktop right sidebar */}
          <aside className="hidden min-[1200px]:block sticky top-24 self-start w-[250px] space-y-4">
            <span className="text-[9px] font-black uppercase tracking-wider text-muted/40 block">Advertisement</span>
            <AdBanner type="300x600" />
          </aside>
          
        </div>
      </main>
    </div>
  );
}
