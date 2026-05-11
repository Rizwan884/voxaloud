import { CheckCircle2 } from 'lucide-react';

export default function InfoBlock() {
  const benefits = [
    'No Registration Required',
    'Full Commercial Rights',
    '500+ Premium AI Voices',
    '75+ Global Languages'
  ];

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
      <div className="space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight font-display text-ink leading-tight uppercase">
            Professional Grade <br /><span className="text-muted">Total Freedom.</span>
          </h2>
          <p className="text-muted/80 text-lg leading-relaxed font-medium">
            Fish Audio Online isn&apos;t just another text-to-speech tool. It&apos;s a professional-grade neural synthesis platform designed for the modern creator economy.
          </p>
        </div>
        
        <p className="text-muted/70 text-sm md:text-base leading-relaxed font-medium">
          We believe high-quality AI narration should be accessible to everyone. That&apos;s why we&apos;ve removed all the barriers. No credit cards, no complex subscriptions, and no hidden limitations. Just paste your script and let our advanced neural models bring your words to life in any language you need.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 rounded-2xl bg-ink text-paper font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-ink/10">
            Start Generating
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
        {benefits.map((title, i) => (
          <div key={i} className="p-8 md:p-10 card-surface flex flex-col items-center justify-center text-center group hover:border-ink/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="text-ink" size={24} />
            </div>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-ink leading-tight">{title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
