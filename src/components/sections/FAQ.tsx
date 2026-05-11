export default function FAQ() {
  const faqs = [
    { 
      q: "Is Fish Audio really free for commercial use?", 
      a: "Yes. All audio generated through Fish Audio Online is yours to keep and use in commercial projects, including YouTube monetization, advertisements, and podcasts, without any attribution required." 
    },
    { 
      q: "What are the character limits per generation?", 
      a: "Our free tier supports up to 10,000 characters per single generation. For longer scripts like audiobooks or long-form videos, you can simply split your text into multiple sessions." 
    },
    { 
      q: "Do I need to create an account or sign up?", 
      a: "No. We value your privacy and time. You can start generating high-quality AI voices immediately without providing an email address or credit card information." 
    },
    { 
      q: "How many languages and voices do you support?", 
      a: "We currently offer 500+ premium neural voices across 75+ global languages and regional accents. We regularly update our library with new, high-fidelity models." 
    },
    { 
      q: "Can I customize the speed and pitch?", 
      a: "Absolutely. Our studio provides intuitive controls to adjust the playback speed and vocal pitch, allowing you to fine-tune the delivery to match your specific content needs." 
    },
    { 
      q: "Is my data and text kept private?", 
      a: "Yes. Your input text and generated audio are processed locally and are not stored on our permanent servers. Your generation history is saved only in your browser's local storage for your convenience." 
    }
  ];

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
