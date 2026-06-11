import { GLOBAL_FAQS } from '@/lib/faqs';

interface FAQProps {
  limit?: number;
}

export default function FAQ({ limit }: FAQProps) {
  const faqs = limit ? GLOBAL_FAQS.slice(0, limit) : GLOBAL_FAQS;

  return (
    <section id="faq" className="pb-12">
      <header className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-ink font-display uppercase">Common Questions</h2>
        <p className="text-muted/60 text-xs md:text-sm uppercase tracking-[0.3em] font-bold">Expert support & transparency</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqs.map((faq, i) => (
          <div key={i} className="card-surface p-10 group hover:bg-ink hover:text-paper transition-all duration-300">
            <h4 className="font-bold mb-4 font-display text-lg leading-snug">{faq.q}</h4>
            <p className="text-muted group-hover:text-paper/70 text-sm leading-relaxed font-medium">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
