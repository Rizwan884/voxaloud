import { Play, Music2, Presentation, Gamepad2, GraduationCap, Radio } from 'lucide-react';

export default function UseCases() {
  const cases = [
    { 
      title: "Content Creators", 
      desc: "Perfect for YouTube videos, TikTok, and Instagram Reels. Add natural narration to your visuals without hiring voice actors.",
      icon: Play
    },
    { 
      title: "Audiobooks & Podcasts", 
      desc: "Convert long-form text into engaging audio content. Ideal for bloggers looking to provide an audio version of their articles.",
      icon: Music2
    },
    { 
      title: "Business & Education", 
      desc: "Elevate your presentations, corporate training videos, and e-learning modules with clear, professional narration.",
      icon: Presentation
    },
    { 
      title: "Game Development", 
      desc: "Bring your characters to life with distinct voices. Rapidly prototype dialogue and sound effects for your indie games.",
      icon: Gamepad2
    },
    { 
      title: "Language Learning", 
      desc: "Practice pronunciation and listening skills across 75+ languages. Generate study materials with authentic local accents.",
      icon: GraduationCap
    },
    { 
      title: "Advertising", 
      desc: "Create multiple versions of your ads with different voices and tones to find what resonates best with your audience.",
      icon: Radio
    }
  ];

  return (
    <section className="bg-ink text-paper p-12 md:p-24 rounded-[2.5rem] overflow-hidden relative group mx-[-1rem] md:mx-0">
      <div className="absolute top-0 right-0 w-96 h-96 bg-paper/5 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-paper/5 rounded-full -ml-32 -mb-32 blur-2xl" />
      
      <div className="relative z-10 space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-3xl md:text-5xl font-black font-display tracking-tight uppercase">Infinite Possibilities</h3>
          <p className="text-paper/60 max-w-xl mx-auto text-sm md:text-base font-medium">
            From viral content to professional training, Fish Audio provides the vocal range your project demands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {cases.map((caseItem, i) => (
            <div key={i} className="space-y-4 group/item">
              <div className="w-12 h-12 rounded-2xl bg-paper/10 flex items-center justify-center group-hover/item:bg-paper group-hover/item:text-ink transition-all duration-300">
                <caseItem.icon size={24} />
              </div>
              <div className="space-y-2 text-left">
                <h4 className="text-xl font-bold font-display">{caseItem.title}</h4>
                <p className="text-sm text-paper/60 leading-relaxed font-medium">{caseItem.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
