import { ShieldCheck } from 'lucide-react';

export default function Features() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: "Use Anywhere", desc: "No copyright strikes. Use your audio for commercial projects safely." },
        { title: "No Sign Up", desc: "Start generating right away. We don't ask for your email or credit card." },
        { title: "Custom Voices", desc: "Easily adjust the pitch and speed to get the exact tone you want." },
        { title: "High Quality Audio", desc: "Download clear, professional MP3 files ready for your video or podcast." },
        { title: "Global Accents", desc: "Create voiceovers in over 75 languages with natural local accents." },
        { title: "Human Sounding", desc: "Our AI voices breathe and pause just like real people do." }
      ].map((feature, i) => (
        <div key={i} className="p-6 md:p-8 card hover:border-ink/20 transition-colors flex flex-col gap-3">
          <ShieldCheck size={20} className="text-ink" />
          <h4 className="text-base font-bold font-display text-ink">{feature.title}</h4>
          <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </section>
  );
}
