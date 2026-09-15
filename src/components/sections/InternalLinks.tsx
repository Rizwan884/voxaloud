import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function InternalLinks() {
  const links = [
    { href: '/voice-clone', label: 'AI Voice Cloning', desc: 'Clone any voice in 15 seconds' },
    { href: '/ai-voice-generator', label: 'AI Voice Generator', desc: 'Professional neural synthesis' },
    { href: '/free-text-to-speech', label: 'Free Text to Speech', desc: 'No-cost unlimited generation' },
    { href: '/text-to-voice', label: 'Text to Voice', desc: 'Instant realistic conversion' },
    { href: '/languages', label: '50+ AI Languages', desc: 'Global accent support' },
    { href: '/commercial-use', label: 'Commercial Rights', desc: 'Safe for YouTube & Ads' },
    { href: '/pricing', label: 'Pricing Plans', desc: 'Professional tier options' },
  ];

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 rounded-lg bg-ink/5 flex items-center justify-center text-ink">
            <Sparkles size={18} />
          </div>
          <h3 className="text-xl font-bold font-display uppercase tracking-tight text-ink">Explore AI Voice Tools</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="p-6 rounded-2xl border border-border bg-surface hover:border-ink/20 hover:bg-paper transition-all group"
            >
              <h4 className="font-bold text-ink group-hover:text-ink transition-colors font-display uppercase text-sm tracking-wide mb-1">
                {link.label}
              </h4>
              <p className="text-xs text-muted font-medium uppercase tracking-wider opacity-60">
                {link.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
