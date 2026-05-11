import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-paper/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/branding/logo.png" alt="Fish Audio Online" className="w-12 h-12 object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-ink font-display leading-none">Fish Audio Online</h1>
            <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mt-0.5">Neural TTS</p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-[12px] font-semibold text-muted">
          <Link href="/" className="hover:text-ink transition-colors">Studio</Link>
          <Link href="/ai-voice-generator" className="hover:text-ink transition-colors">AI Generator</Link>
          <Link href="/languages" className="hover:text-ink transition-colors">Languages</Link>
          <Link href="/pricing" className="hover:text-ink transition-colors">Pricing</Link>
          <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
        </div>
      </div>
    </nav>
  );
}
