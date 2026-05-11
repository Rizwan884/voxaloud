import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 text-center">
      <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-ink text-paper relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-paper/5 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-paper/10 transition-colors duration-500" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="text-3xl md:text-6xl font-black font-display tracking-tight leading-tight uppercase">
            Ready to <br />
            <span className="text-paper/40 italic">Find Your Voice?</span>
          </h2>
          <p className="text-paper/60 max-w-xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            Join thousands of creators using Fish Audio to bring their stories to life. No credit card, no sign-up, just unlimited AI voices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/" 
              className="px-10 py-5 rounded-2xl bg-paper text-ink font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl flex items-center gap-3"
            >
              Start Generating Now
              <ArrowRight size={18} />
            </Link>
          </div>
          <p className="text-[10px] text-paper/30 uppercase tracking-widest font-black pt-4">
            Free for commercial use • 500+ voices • 75+ languages
          </p>
        </div>
      </div>
    </section>
  );
}
