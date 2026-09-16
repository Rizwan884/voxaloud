import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function InfoBlock() {
  const benefits = [
    { title: 'No Registration Required', desc: 'Instant anonymous creation without email forms.' },
    { title: 'Full Commercial Rights', desc: '100% royalty-free monetization across all media.' },
    { title: '500+ Premium AI Voices', desc: 'Diverse character, narration, and ad personas.' },
    { title: '75+ Global Languages', desc: 'Authentic dialect inflection and accents.' },
  ];

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-12">
      <div className="space-y-6 max-w-xl text-left">
        <div className="space-y-3">
          <span className="badge-accent">
            Built for Creators
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink tracking-tight leading-tight">
            Professional audio quality with <br />
            <span className="text-muted font-normal">complete creative freedom.</span>
          </h2>
          <p className="text-base text-ink-2 font-normal leading-relaxed">
            Fish Audio Online is engineered for the modern content economy. We believe high-quality AI narration should be accessible to every creator, developer, and educator without complex software barriers.
          </p>
        </div>
        
        <p className="text-sm text-muted leading-relaxed font-normal">
          No credit card commitments, no artificial download caps, and no watermark restrictions. Simply paste your script and let our neural acoustic models synthesize lifelike vocal performances in any language.
        </p>

        <div className="pt-2">
          <Link 
            href="/voice-clone" 
            className="btn-accent !px-6 !py-3 !text-sm group"
          >
            <span>Start Voice Studio</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-md">
        {benefits.map((item) => (
          <div 
            key={item.title} 
            className="card p-6 flex flex-col space-y-3 hover:border-accent/40 group transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <CheckCircle2 size={18} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold font-display text-ink group-hover:text-accent transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-muted leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
