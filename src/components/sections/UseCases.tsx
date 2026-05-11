export default function UseCases() {
  return (
    <section className="bg-ink text-paper p-12 md:p-20 rounded-3xl text-center mx-[-1rem] md:mx-0">
      <h3 className="text-3xl md:text-4xl font-bold font-display mb-12 tracking-tight">USE CASES</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
        {[
          { title: "YouTube", desc: "Engaging voiceovers" },
          { title: "TikTok", desc: "Viral voice content" },
          { title: "Presentations", desc: "Professional narration" }
        ].map((caseItem, i) => (
          <div key={i} className="flex flex-col items-center">
            <h4 className="text-xl md:text-2xl font-bold mb-2 font-display">{caseItem.title}</h4>
            <p className="text-[11px] text-paper/60 uppercase tracking-widest font-semibold">{caseItem.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
