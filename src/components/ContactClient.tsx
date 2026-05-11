'use client';

import { Mail, Code, MessageSquare, Send } from 'lucide-react';

export default function ContactClient() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight">
            Get in <span className="text-muted">Touch.</span>
          </h1>
          <p className="text-lg text-muted/80 font-medium leading-relaxed">
            We&apos;re here to help you scale your vocal content. Whether you have a technical question or want to discuss a custom integration, we&apos;re only an email away.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="mailto:rizwanrasheed046@gmail.com" className="card-surface p-6 flex flex-col items-center text-center gap-4 hover:border-ink/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-ink/5 flex items-center justify-center text-muted group-hover:bg-ink group-hover:text-paper transition-all">
              <Mail size={18} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">Email Support</p>
            <p className="text-sm font-bold text-ink">rizwanrasheed046@gmail.com</p>
          </a>
          <a href="https://github.com/rizwan884" target="_blank" rel="noopener noreferrer" className="card-surface p-6 flex flex-col items-center text-center gap-4 hover:border-ink/20 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-ink/5 flex items-center justify-center text-muted group-hover:bg-ink group-hover:text-paper transition-all">
              <Code size={18} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted">Open Source</p>
            <p className="text-sm font-bold text-ink">@rizwan884</p>
          </a>
        </div>

        <div className="bg-ink rounded-[2rem] p-8 text-paper space-y-4 relative overflow-hidden">
          <div className="absolute right-[-20px] top-[-20px] opacity-10 rotate-12">
            <MessageSquare size={120} />
          </div>
          <h3 className="text-xl font-bold font-display uppercase tracking-tight">Enterprise Inquiries</h3>
          <p className="text-sm text-paper/60 leading-relaxed font-medium">
            Need custom voice models or high-volume API access? Contact our enterprise team for dedicated infrastructure and support.
          </p>
        </div>
      </div>

      <div className="card shadow-2xl p-8 md:p-10 space-y-8 bg-paper">
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-display text-ink uppercase tracking-tight">Send a Message</h2>
          <p className="text-[11px] text-muted font-bold uppercase tracking-widest">We typically respond within 24 hours</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">Full Name</label>
              <input type="text" placeholder="John Doe" className="field" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">Email Address</label>
              <input type="email" placeholder="john@example.com" className="field" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">Message Subject</label>
            <input type="text" placeholder="Support Request" className="field" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted px-1">How can we help?</label>
            <textarea placeholder="Describe your inquiry..." className="field h-32 resize-none pt-4" />
          </div>
          <button type="submit" className="btn-primary w-full !py-4 shadow-xl shadow-ink/10">
            Send Message
            <Send size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
