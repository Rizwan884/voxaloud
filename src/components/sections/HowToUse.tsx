import { Type, Cpu, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HowToUse() {
  const steps = [
    { 
      step: "01", 
      title: "Input Script or Sample", 
      desc: "Paste your script into the editor up to 10,000 characters, or upload/record a 15-second voice sample for instant zero-shot cloning.",
      icon: Type,
      tag: "15s Audio or Text"
    },
    { 
      step: "02", 
      title: "Select Voice & Customize", 
      desc: "Choose from 500+ studio voices across 75+ languages or synthesize in your own cloned timbre. Adjust fine-grain pitch and playback rate.",
      icon: Cpu,
      tag: "500+ Voices & 75+ Langs"
    },
    { 
      step: "03", 
      title: "Export Studio-Grade MP3", 
      desc: "Listen with real-time waveform playback. Download 44.1kHz high-fidelity audio with full commercial rights and zero watermarks.",
      icon: Download,
      tag: "44.1kHz Master Audio"
    }
  ];

  return (
    <section className="space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="badge-accent">
          Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink tracking-tight">
          How Fish Audio works in 3 simple steps.
        </h2>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          From script to master voiceover in under a minute. No complex software installations, no credit card required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((item) => (
          <div 
            key={item.step} 
            className="card p-7 flex flex-col justify-between space-y-6 group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent font-display tracking-wider bg-accent-light px-2.5 py-1 rounded-full border border-accent-subtle">
                  Step {item.step}
                </span>
                <span className="text-[11px] font-medium text-muted">
                  {item.tag}
                </span>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-surface-2 flex items-center justify-center text-ink group-hover:bg-accent group-hover:text-white transition-colors duration-200">
                <item.icon size={20} />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold font-display text-ink group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60 flex items-center text-xs font-semibold text-muted group-hover:text-ink transition-colors">
              <span>Try step in Studio</span>
              <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
