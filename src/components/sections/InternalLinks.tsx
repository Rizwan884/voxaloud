import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function InternalLinks() {
  const links = [
    { href: '/voice-clone', label: 'AI Voice Cloning Studio', desc: 'Clone any voice from a 15-second sample' },
    { href: '/ai-voice-generator', label: 'AI Voice Generator', desc: '500+ ready-to-use neural studio voices' },
    { href: '/free-text-to-speech', label: 'Free Text to Speech', desc: 'Zero-cost generation with no watermarks' },
    { href: '/text-to-voice', label: 'Text to Voice Converter', desc: 'Instant audio narration in 75+ languages' },
    { href: '/languages', label: '75+ Global Languages', desc: 'Explore regional accents and dialect models' },
    { href: '/commercial-use', label: 'Commercial Rights License', desc: '100% safe for YouTube monetization & ads' },
    { href: '/pricing', label: 'Simple Pricing & Plans', desc: 'Explore generous free tier and creator pro features' },
  ];

  return (
    <section className="py-16 sm:py-20 border-t border-border/80">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-light text-accent flex items-center justify-center">
            <Sparkles size={17} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-ink tracking-tight">Explore Neural Audio Tools</h3>
            <p className="text-xs text-muted">Discover other capabilities in the Fish Audio ecosystem</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="card p-5 hover:border-accent/40 group transition-all duration-150 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-ink group-hover:text-accent transition-colors font-display">
                    {link.label}
                  </h4>
                  <ArrowRight size={13} className="text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-muted leading-relaxed font-normal">
                  {link.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
