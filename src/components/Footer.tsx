import Link from 'next/link';
import Image from 'next/image';
import { Mail, Code, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Studio', href: '/' },
        { label: 'AI Voice Generator', href: '/ai-voice-generator' },
        { label: 'Free Text to Speech', href: '/free-text-to-speech' },
        { label: 'Text to Voice', href: '/text-to-voice' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Languages', href: '/languages' },
        { label: 'Commercial Use', href: '/commercial-use' },
        { label: 'Blog', href: '/blog' },
        { label: 'FAQ', href: '/faq' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Pricing', href: '/pricing' },
      ]
    }
  ];

  return (
    <footer className="bg-paper border-t border-border pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/branding/logo.png" 
                alt="Fish Audio" 
                width={40} 
                height={40} 
                className="object-contain" 
              />
              <span className="text-xl font-bold font-display text-ink">Fish Audio Online</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              The world&apos;s most advanced neural text-to-speech platform. Empowering creators with natural, emotive AI voices for every project.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://twitter.com/fishaudio" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-ink hover:bg-paper transition-all border border-border shadow-sm group">
                <Globe size={16} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="https://github.com/rizwan884" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-ink hover:bg-paper transition-all border border-border shadow-sm group">
                <Code size={16} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="mailto:rizwanrasheed046@gmail.com" className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-muted hover:text-ink hover:bg-paper transition-all border border-border shadow-sm group">
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-ink">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted hover:text-ink transition-colors font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-medium">
            &copy; {currentYear} Fish Audio Online. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <Link href="/privacy" className="text-[10px] uppercase tracking-wider font-bold text-muted hover:text-ink">Privacy</Link>
             <Link href="/terms" className="text-[10px] uppercase tracking-wider font-bold text-muted hover:text-ink">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
