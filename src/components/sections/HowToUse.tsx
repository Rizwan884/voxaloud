export default function HowToUse() {
  return (
    <section>
      <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-display mb-12 text-center text-ink">How to Use <span className="text-muted">Fish Audio Online</span></h3>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { step: "01", title: "Type Your Text", desc: "Paste your script into the text box above." },
          { step: "02", title: "Pick a Voice", desc: "Choose from 500+ human-sounding AI voices." },
          { step: "03", title: "Download Audio", desc: "Click generate to download your MP3 file instantly." }
        ].map((item, i) => (
          <div key={i} className="relative p-8 card-surface flex flex-col items-center text-center overflow-hidden group">
            <span className="text-6xl md:text-8xl font-black text-ink/5 absolute -top-4 -left-4 font-display group-hover:scale-110 transition-transform">{item.step}</span>
            <div className="relative z-10 pt-4">
              <h4 className="text-lg font-bold mb-3 font-display text-ink">{item.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
