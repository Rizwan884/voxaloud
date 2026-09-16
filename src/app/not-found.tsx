import Link from 'next/link';
import { Sparkles, ArrowLeft, Mic2, Compass, Layers, ShieldCheck } from 'lucide-react';

export default function NotFound() {
  const helpfulLinks = [
    { title: 'Voice Cloning Studio', desc: 'Clone any voice from a 15-second sample', href: '/voice-clone', icon: Mic2 },
    { title: 'AI Voice Generator', desc: '500+ ready-made natural neural voices', href: '/ai-voice-generator', icon: Sparkles },
    { title: '75+ Languages', desc: 'Browse multilingual text-to-speech models', href: '/languages', icon: Layers },
    { title: 'Commercial License', desc: '100% royalty-free monetization rights', href: '/commercial-use', icon: ShieldCheck },
  ];

  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-canvas dot-grid">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold">
          <Compass size={13} />
          <span>Error 404 &bull; Page Not Found</span>
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-ink tracking-tight">
            Lost your frequency?
          </h1>
          <p className="text-base text-muted max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, renamed, or doesn&apos;t exist. Let&apos;s get you back to creating.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {helpfulLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="card p-4 flex items-start gap-3 hover:border-accent/40 group transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-surface-2 flex items-center justify-center text-ink group-hover:bg-accent-light group-hover:text-accent-text transition-colors shrink-0">
                <link.icon size={17} />
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-xs font-semibold text-ink group-hover:text-accent transition-colors truncate">
                  {link.title}
                </p>
                <p className="text-[11px] text-muted truncate">
                  {link.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <div className="pt-2">
          <Link href="/" className="btn-accent group !px-6 !py-3">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Voice Studio</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
