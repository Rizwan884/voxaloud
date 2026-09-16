import { Play, Music2, Presentation, Gamepad2, GraduationCap, Radio, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function UseCases() {
  const cases = [
    { 
      title: "Content Creators & Shorts", 
      desc: "Generate engaging narration for YouTube, TikTok, and Instagram Reels without needing an expensive microphone or recording booth.",
      icon: Play,
      tag: "Social Video"
    },
    { 
      title: "Audiobooks & Long Narration", 
      desc: "Convert written manuscripts into captivating audiobooks with consistent character voices, natural pauses, and breath flow.",
      icon: Music2,
      tag: "Publishing"
    },
    { 
      title: "Business & E-Learning", 
      desc: "Elevate product walkthroughs, onboarding videos, and compliance training modules with clear, friendly, and authoritative voices.",
      icon: Presentation,
      tag: "Enterprise"
    },
    { 
      title: "Game Development & NPCs", 
      desc: "Rapidly prototype dialogue for indie games, RPGs, and visual novels across dozens of distinct character personalities.",
      icon: Gamepad2,
      tag: "Gaming"
    },
    { 
      title: "Multilingual Dubbing", 
      desc: "Translate and localize your message into 75+ languages while preserving the speaker's vocal personality and pacing.",
      icon: GraduationCap,
      tag: "Localization"
    },
    { 
      title: "Commercials & Audio Ads", 
      desc: "A/B test different accents, energy levels, and cadences for high-converting marketing campaigns and sponsored spots.",
      icon: Radio,
      tag: "Marketing"
    }
  ];

  return (
    <section className="bg-ink text-paper p-8 sm:p-12 lg:p-16 rounded-3xl overflow-hidden relative group">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
      
      <div className="relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-paper/10 border border-paper/15 text-paper/90">
            Versatility
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Infinite vocal possibilities for every production.
          </h2>
          <p className="text-sm sm:text-base text-paper/70 leading-relaxed font-normal">
            From viral social shorts to full-length audiobooks, Fish Audio delivers the vocal range your project requires.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <div 
              key={caseItem.title} 
              className="p-6 rounded-2xl bg-paper/5 border border-paper/10 hover:border-paper/25 hover:bg-paper/8 transition-all duration-200 flex flex-col justify-between space-y-4 group/card"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-paper/10 flex items-center justify-center text-paper group-hover/card:bg-accent group-hover/card:text-white transition-colors">
                    <caseItem.icon size={18} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-paper/50">
                    {caseItem.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-white">
                  {caseItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-paper/65 leading-relaxed font-normal">
                  {caseItem.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-paper/10 flex items-center text-xs font-semibold text-paper/70 group-hover/card:text-white transition-colors">
                <Link href="/" className="inline-flex items-center gap-1">
                  <span>Generate audio</span>
                  <ArrowRight size={12} className="group-hover/card:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
