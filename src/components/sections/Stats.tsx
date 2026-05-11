export default function Stats() {
  return (
    <section className="py-12 md:py-24 border-y border-border relative overflow-hidden bg-surface/50 -mx-4 md:mx-0 px-4 md:px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 text-center">
        <div className="space-y-2">
          <p className="text-4xl md:text-6xl font-bold tracking-tighter text-ink font-display">500+</p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">AI Voices</p>
        </div>
        <div className="space-y-2">
          <p className="text-4xl md:text-6xl font-bold tracking-tighter text-ink font-display">10K</p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">Character Limit</p>
        </div>
        <div className="space-y-2">
          <p className="text-4xl md:text-6xl font-bold tracking-tighter text-ink font-display">75+</p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">Languages</p>
        </div>
        <div className="space-y-2">
          <p className="text-4xl md:text-6xl font-bold tracking-tighter text-ink font-display">&lt;2s</p>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted">Generation Time</p>
        </div>
      </div>
    </section>
  );
}
