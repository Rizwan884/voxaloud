import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto p-8 sm:p-12 lg:p-16 rounded-3xl bg-ink text-paper text-center relative overflow-hidden group shadow-2xl shadow-ink/10">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/25 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/15 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />
        
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper/10 border border-paper/15 text-paper text-xs font-semibold">
            <Sparkles size={13} className="text-accent" />
            <span>Create in Seconds &bull; Zero Risk</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight">
            Ready to find your <br />
            <span className="text-paper/70 font-normal">signature voice?</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-paper/70 leading-relaxed font-normal">
            Join over 50,000 creators, podcasters, and developers using Fish Audio to bring their stories to life. No credit card required.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link 
              href="/voice-clone" 
              className="btn-accent !px-7 !py-3.5 !text-sm !font-semibold w-full sm:w-auto shadow-lg shadow-accent/20 group/btn"
            >
              <span>Clone Your Voice Now</span>
              <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            <Link 
              href="/ai-voice-generator" 
              className="inline-flex items-center justify-center gap-2 border border-paper/20 bg-paper/10 text-paper font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-paper/15 transition-all w-full sm:w-auto"
            >
              <span>Browse 500+ Ready Voices</span>
            </Link>
          </div>

          {/* Security / Commercial Rights Guarantee */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-paper/50">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Commercial Rights Included &bull; Instant MP3 Export &bull; No Watermark</span>
          </div>
        </div>
      </div>
    </section>
  );
}
