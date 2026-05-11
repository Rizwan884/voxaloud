export default function HowToUse() {
  const steps = [
    { 
      step: "01", 
      title: "Input Your Script", 
      desc: "Type or paste your text into the studio. Our engine supports up to 10,000 characters per generation for long-form content." 
    },
    { 
      step: "02", 
      title: "Select Your Voice", 
      desc: "Browse our library of 500+ premium AI voices. Filter by language, gender, and style to find the perfect match for your brand." 
    },
    { 
      step: "03", 
      title: "Export & Create", 
      desc: "Preview your generation in real-time, then download your high-quality MP3 file. It's ready for any project instantly." 
    }
  ];

  return (
    <section>
      <div className="text-center mb-16 space-y-4">
        <h3 className="text-3xl md:text-5xl font-black tracking-tight font-display text-ink">
          Seamless <span className="text-muted">Workflow.</span>
        </h3>
        <p className="text-muted/80 max-w-2xl mx-auto font-medium">
          Professional voiceovers in three simple steps. No complex software, no hidden costs.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((item, i) => (
          <div key={i} className="relative p-10 card-surface flex flex-col items-center text-center overflow-hidden group hover:border-ink/20 transition-all duration-300">
            <span className="text-6xl md:text-9xl font-black text-ink/5 absolute -top-4 -left-4 font-display group-hover:scale-110 group-hover:text-ink/10 transition-all duration-500">{item.step}</span>
            <div className="relative z-10 pt-4 space-y-4">
              <h4 className="text-xl font-bold font-display text-ink">{item.title}</h4>
              <p className="text-sm text-muted/80 leading-relaxed font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
