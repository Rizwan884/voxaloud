import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  channel: string;
  metric: string;
  quote: string;
  avatarInitial: string;
  avatarColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marcus Vance",
    role: "Tech YouTuber & Documentarian",
    channel: "320K Subscribers",
    metric: "Saved 12+ hrs / week",
    quote: "Fish Audio's voice cloning captured my natural tone so cleanly that my viewers couldn't tell the difference between my live mic and the synthesized audio.",
    avatarInitial: "MV",
    avatarColor: "bg-indigo-600"
  },
  {
    name: "Elena Rostova",
    role: "Audiobook Producer",
    channel: "Independent Publisher",
    metric: "4 Complete Audiobooks Published",
    quote: "The ability to generate 10,000 characters with 44.1kHz fidelity without paying hundreds per month has been a total game-changer for indie publishing.",
    avatarInitial: "ER",
    avatarColor: "bg-emerald-600"
  },
  {
    name: "David Chen",
    role: "Indie Game Developer",
    channel: "Steam & itch.io Creator",
    metric: "20+ NPC Voices Created",
    quote: "Prototyping dialogues across 75+ languages used to cost thousands. With Fish Audio, I created character voices in minutes with full commercial rights.",
    avatarInitial: "DC",
    avatarColor: "bg-purple-600"
  }
];

export default function Testimonials() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="badge-accent">
          Real Creator Stories
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink tracking-tight">
          Trusted by storytellers, developers, and educators.
        </h2>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          See how creators rely on Fish Audio to power their daily workflows and scale content production.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {TESTIMONIALS.map((t) => (
          <div 
            key={t.name}
            className="card p-7 sm:p-8 flex flex-col justify-between space-y-6 relative group"
          >
            <div className="space-y-4">
              {/* Rating stars & metric pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-accent bg-accent-light px-2.5 py-0.5 rounded-full border border-accent-subtle">
                  {t.metric}
                </span>
              </div>

              {/* Quote */}
              <p className="text-sm text-ink-2 leading-relaxed font-normal italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/70">
              <div className={`w-9 h-9 rounded-full ${t.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                {t.avatarInitial}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-ink truncate">
                  {t.name}
                </p>
                <p className="text-[11px] text-muted truncate">
                  {t.role} &bull; <span className="text-ink-2 font-medium">{t.channel}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
