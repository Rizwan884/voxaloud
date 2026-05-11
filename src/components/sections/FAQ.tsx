export default function FAQ() {
  return (
    <section id="faq" className="pb-12">
      <header className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-4 font-display">Common Questions</h2>
        <p className="text-muted text-sm uppercase tracking-[0.2em] font-semibold">Everything you need to know</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { q: "Is there a limit?", a: "You can type up to 10000 characters at once. Need more? Just generate multiple files." },
          { q: "Do the voices sound robotic?", a: "Not at all. We use advanced AI to make sure our voices sound natural and human." },
          { q: "Can I use this for YouTube or TikTok?", a: "Yes! You can use the audio for any commercial project without paying us." },
          { q: "Can I change the speed?", a: "Yes, you can adjust the speed and pitch to make the voice match your content perfectly." },
          { q: "Do you save my audio?", a: "Your last 10 audios are saved in your browser history so you don't lose them." },
          { q: "Is my data private?", a: "Yes. We don't store your text or audio on our servers." }
        ].map((faq, i) => (
          <div key={i} className="card-surface p-6 md:p-8 group hover:bg-surface-2 transition-colors">
            <h4 className="font-bold text-ink mb-3 font-display text-base">{faq.q}</h4>
            <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
