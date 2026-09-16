'use client';

import { useState } from 'react';
import { Mail, Code, MessageSquare, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Left Column: Direct channels */}
      <div className="lg:col-span-5 space-y-8 text-left">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <Sparkles size={13} className="text-accent" />
            <span>Support &amp; Inquiries</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight leading-[1.1]">
            Get in touch with the team.
          </h1>

          <p className="text-sm sm:text-base text-ink-2 leading-relaxed font-normal">
            Whether you have questions about custom neural model training, API access, commercial licensing, or platform feedback, our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a 
            href="mailto:contact@fishaudio.online" 
            className="card p-5 space-y-2 hover:border-accent/40 group transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-accent-light text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail size={18} />
            </div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">Email Support</p>
            <p className="text-xs font-bold text-ink truncate">contact@fishaudio.online</p>
          </a>

          <a 
            href="https://github.com/rizwan884" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="card p-5 space-y-2 hover:border-accent/40 group transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-surface-2 text-ink flex items-center justify-center group-hover:scale-105 transition-transform">
              <Code size={18} />
            </div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">GitHub</p>
            <p className="text-xs font-bold text-ink truncate">@rizwan884</p>
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-ink text-paper space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2 text-accent text-xs font-semibold">
            <MessageSquare size={16} />
            <span>Enterprise SLAs &amp; Custom Voice Clones</span>
          </div>
          <h3 className="text-base font-bold font-display text-white">
            High-Volume Compute &amp; Integrations
          </h3>
          <p className="text-xs text-paper/70 leading-relaxed font-normal">
            Need dedicated GPU clusters, voice fine-tuning for your brand, or custom contract terms? Reach out for priority review.
          </p>
        </div>
      </div>

      {/* Right Column: Interactive Form */}
      <div className="lg:col-span-7 card p-8 sm:p-10 space-y-6">
        <div className="space-y-1 text-left">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-ink tracking-tight">
            Send us a message
          </h2>
          <p className="text-xs text-muted">
            We typically respond within 24 hours on business days.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-base font-bold text-emerald-900 font-display">
              Message Sent Successfully!
            </h3>
            <p className="text-xs text-emerald-800 max-w-sm mx-auto">
              Thank you for reaching out. A team member will reply to your email shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="btn-outline !py-2 !px-4 !text-xs mt-2"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Morgan" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="field" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-ink-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="alex@company.com" 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="field" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-2">Subject</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Enterprise Voice Cloning or Bug Report" 
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="field" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-2">How can we help?</label>
              <textarea 
                required
                rows={4}
                placeholder="Provide details about your project, volume needs, or question..." 
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="field resize-none py-3" 
              />
            </div>

            <button 
              type="submit" 
              className="btn-accent w-full !py-3.5 !text-xs !font-semibold shadow-md shadow-accent/20 cursor-pointer"
            >
              <span>Submit Message</span>
              <Send size={14} />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
