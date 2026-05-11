import AdBanner from '@/components/AdBanner';

export default function Hero() {
  return (
    <header className="space-y-4">
      <div className="hidden md:block">
        <AdBanner type="728x90" />
      </div>
      <div className="md:hidden">
        <AdBanner type="320x50" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-ink font-display tracking-tight leading-[1.1]">
        Free AI <br className="hidden md:block" /><span className="text-muted">Voice Generator.</span>
      </h2>
      <p className="text-base text-muted max-w-xl leading-relaxed">
        Turn text into realistic speech in seconds. Choose from 500+ human-sounding AI voices in 75 languages. 100% free to use anywhere.
      </p>
    </header>
  );
}
