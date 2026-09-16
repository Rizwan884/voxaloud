import { Star } from 'lucide-react';

export default function SocialProofBar() {
  const platforms = [
    { name: 'YouTube Creators', detail: 'Audio for Shorts & Long-Form' },
    { name: 'Spotify Podcasters', detail: 'Intro & Full Narration' },
    { name: 'Game Studios', detail: 'NPC & Dialogue Prototyping' },
    { name: 'Global Publishers', detail: 'Multilingual Dubbing' },
    { name: 'E-Learning', detail: 'Course Narration & Tutorials' },
  ];

  return (
    <div className="w-full pt-4 pb-2 border-y border-border/70 bg-surface/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Rating & User count */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex -space-x-2 overflow-hidden">
            {['/branding/app-icon.png', '/branding/app-icon.png', '/branding/app-icon.png'].map((src, i) => (
              <div 
                key={i} 
                className="inline-block h-7 w-7 rounded-full ring-2 ring-surface bg-ink-2 text-paper text-[10px] font-bold flex items-center justify-center shadow-xs"
              >
                {['JD', 'MK', 'AL'][i]}
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-ink ml-1">4.9 / 5</span>
            </div>
            <span className="text-[11px] text-muted font-medium">
              Over 50,000+ voices generated
            </span>
          </div>
        </div>

        {/* Platform tags */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-xs text-muted">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-ink-2 mr-1">
            Built for:
          </span>
          {platforms.map((p) => (
            <span 
              key={p.name} 
              className="px-2.5 py-1 rounded-lg bg-surface border border-border text-ink-2 font-medium text-[11px] shadow-xs hover:border-border-strong transition-colors"
            >
              {p.name}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
