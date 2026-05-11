import AdBanner from '@/components/AdBanner';

export default function Hero() {
  return (
    <header className="space-y-6">
      <div className="hidden md:block">
        <AdBanner type="728x90" />
      </div>
      <div className="md:hidden">
        <AdBanner type="320x50" />
      </div>
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-bold uppercase tracking-wider text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
          Unlimited Free Access
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-ink font-display tracking-tight leading-[1.05] max-w-3xl">
          Ultra-Realistic AI <br className="hidden md:block" />
          <span className="text-muted">Voice Generator.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted/80 max-w-2xl leading-relaxed font-medium">
          Transform your text into professional-grade speech instantly. Choose from 500+ human-like voices in 75+ languages. <span className="text-ink font-semibold">No login, no limits, 100% free for commercial use.</span>
        </p>
      </div>
    </header>
  );
}
