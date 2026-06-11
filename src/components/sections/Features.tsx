import { ShieldCheck, Zap, Mic2, Download, Languages, UserCheck } from 'lucide-react';

export default function Features() {
  const features = [
    { 
      title: "Text to Speech Online — Commercial License Included", 
      desc: "Full rights to your generated audio. Use it for YouTube, podcasts, ads, or any business project without licensing worries.",
      icon: ShieldCheck
    },
    { 
      title: "Natural AI Voice Generator", 
      desc: "Powered by advanced neural networks, our engine processes thousands of characters in seconds with zero latency.",
      icon: Zap
    },
    { 
      title: "AI Voice Synthesis — 44kHz Studio Quality", 
      desc: "Export high-fidelity MP3 files at 44.1kHz. Perfect for professional content production and high-end video editing.",
      icon: Mic2
    },
    { 
      title: "Global Diversity & 75+ Languages", 
      desc: "Access 500+ premium voices across 75+ languages and regional accents. Reach a global audience with localized content.",
      icon: Languages
    },
    { 
      title: "Free Text to Speech — No Login Required", 
      desc: "Completely anonymous usage. No sign-ups, no subscriptions, and no hidden fees. Just open and generate.",
      icon: UserCheck
    },
    { 
      title: "Easy Integration & MP3 Downloads", 
      desc: "Download and use your audio files instantly. Compatible with all major video editors and publishing platforms.",
      icon: Download
    }
  ];

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <div key={i} className="p-8 card hover:border-ink/20 transition-all duration-300 flex flex-col gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-ink/5 flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors duration-300">
            <feature.icon size={20} />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-bold font-display text-ink">{feature.title}</h4>
            <p className="text-sm text-muted/80 leading-relaxed">{feature.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
