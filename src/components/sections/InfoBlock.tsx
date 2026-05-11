import { CheckCircle2 } from 'lucide-react';

export default function InfoBlock() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-display text-ink leading-[1.2]">
          Free Text-to-Speech <br /><span className="text-muted">for Creators</span>
        </h2>
        <p className="text-muted text-base leading-relaxed">
          Fish Audio Online is a free AI voice generator that sounds like a real human. Get access to over 500 premium voices across 75 languages to make your content stand out.
          <br /><br />
          You don&apos;t need to sign up or add a credit card. Just type your text, choose a voice, and download your audio. It&apos;s completely free for commercial use.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
        {['No Registration', 'Commercial Use', '500+ AI Voices', '75+ Languages'].map((title, i) => (
          <div key={i} className="p-6 card-surface flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="mb-3 text-ink" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink">{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
