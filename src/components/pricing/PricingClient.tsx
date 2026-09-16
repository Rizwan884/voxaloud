"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Crown, Building2, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PricingClient() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Free Starter',
      badge: 'Zero Risk',
      icon: Zap,
      monthlyPrice: '$0',
      annualPrice: '$0',
      period: 'forever',
      desc: 'Ideal for personal hobbyists, social content testing, and casual voice synthesis.',
      ctaText: 'Start for Free',
      ctaHref: '/signup?plan=free',
      featured: false,
      features: [
        '10,000 characters per month',
        'Access to 500+ standard neural voices',
        '1 instant voice clone slot (15s sample)',
        'Up to 1,000 chars per generation',
        'Full commercial rights (attribution appreciated)',
        'Standard 44.1kHz MP3 download',
        'Community support forum',
      ],
    },
    {
      name: 'Creator Pro',
      badge: 'Most Popular',
      icon: Crown,
      monthlyPrice: '$19',
      annualPrice: '$15',
      period: 'per month',
      desc: 'Engineered for YouTubers, podcasters, indie developers, and professional creators.',
      ctaText: 'Start Pro Free Trial',
      ctaHref: '/signup?plan=pro',
      featured: true,
      features: [
        '150,000 characters per month',
        'Unlimited instant voice clones',
        'Up to 10,000 chars per generation',
        '100% Commercial License (no attribution)',
        'Priority neural GPU queue (instant streaming)',
        'Full REST API access for developers',
        'Background noise cancellation & audio enhancer',
        'Priority email & chat support',
      ],
    },
    {
      name: 'Studio Enterprise',
      badge: 'Teams & Scale',
      icon: Building2,
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      period: 'tailored volume',
      desc: 'For media studios, global game publishers, and enterprises needing dedicated compute.',
      ctaText: 'Contact Enterprise Team',
      ctaHref: '/contact?subject=enterprise',
      featured: false,
      features: [
        'Unlimited or customized character volume',
        'Custom voice model training & fine-tuning',
        'Dedicated GPU clusters & 99.99% uptime SLA',
        'Multi-seat team workspace management',
        'Enterprise SSO & security compliance',
        'Dedicated technical account manager',
        'Custom invoicing & payment terms',
      ],
    },
  ];

  const comparisonCategories = [
    {
      category: 'Usage & Compute',
      features: [
        { name: 'Monthly Character Allowance', free: '10,000', pro: '150,000', ent: 'Unlimited / Custom' },
        { name: 'Single Generation Limit', free: '1,000 chars', pro: '10,000 chars', ent: '50,000+ chars' },
        { name: 'GPU Queue Priority', free: 'Standard', pro: 'High (0s latency)', ent: 'Dedicated Cluster' },
        { name: 'Audio Export Quality', free: '44.1kHz MP3', pro: '44.1kHz MP3 & WAV', ent: 'Lossless 48kHz WAV' },
      ],
    },
    {
      category: 'Voice Cloning & Library',
      features: [
        { name: 'Zero-Shot Voice Cloning Slots', free: '1 Active Slot', pro: 'Unlimited Slots', ent: 'Unlimited & Custom' },
        { name: '500+ Ready-Made Voices', free: 'Included', pro: 'Included', ent: 'Included' },
        { name: '75+ Global Languages', free: 'Included', pro: 'Included', ent: 'Included' },
        { name: 'Custom Neural Model Fine-Tuning', free: '—', pro: '—', ent: 'Included' },
      ],
    },
    {
      category: 'Licensing & Developer Access',
      features: [
        { name: 'Commercial Rights License', free: 'Yes', pro: 'Yes (Unrestricted)', ent: 'Enterprise Custom' },
        { name: 'Attribution Requirement', free: 'Appreciated', pro: 'None required', ent: 'None required' },
        { name: 'Developer REST API Access', free: '—', pro: 'Full Access', ent: 'High-Throughput API' },
        { name: 'Support SLA', free: 'Community', pro: 'Priority Email', ent: '24/7 Dedicated Slack' },
      ],
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center gap-3">
        <div className="p-1 bg-surface-2 rounded-full border border-border flex items-center shadow-xs">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-surface text-ink shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            Monthly Billing
          </button>

          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              billingCycle === 'annual'
                ? 'bg-accent text-white shadow-xs'
                : 'text-muted hover:text-ink'
            }`}
          >
            <span>Annual Billing</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              billingCycle === 'annual' 
                ? 'bg-white/20 text-white' 
                : 'bg-accent-light text-accent-text'
            }`}>
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
        {plans.map((plan) => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isFeatured = plan.featured;

          return (
            <div
              key={plan.name}
              className={`card p-7 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                isFeatured
                  ? 'border-accent shadow-xl shadow-accent/10 ring-2 ring-accent/20 md:-translate-y-2'
                  : 'hover:border-border-strong'
              }`}
            >
              {/* Top Badge */}
              {isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {plan.name}
                    </span>
                    <h3 className="text-xl font-bold font-display text-ink">
                      {plan.name}
                    </h3>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isFeatured ? 'bg-accent-light text-accent' : 'bg-surface-2 text-ink'
                  }`}>
                    <plan.icon size={20} />
                  </div>
                </div>

                {/* Price Display */}
                <div className="space-y-1 pb-4 border-b border-border/70">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-bold font-display text-ink tracking-tight">
                      {price}
                    </span>
                    {price !== 'Custom' && (
                      <span className="text-xs text-muted font-medium">
                        / {plan.period}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'annual' && price !== '$0' && price !== 'Custom' && (
                    <p className="text-[11px] text-accent font-medium">
                      Billed annually ($180/yr) &bull; Save $48/year
                    </p>
                  )}
                  <p className="text-xs text-muted leading-relaxed pt-1">
                    {plan.desc}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2 block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isFeatured ? 'bg-accent-light text-accent' : 'bg-surface-2 text-ink'
                        }`}>
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link
                  href={plan.ctaHref}
                  className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isFeatured
                      ? 'btn-accent shadow-md shadow-accent/20 hover:shadow-lg'
                      : 'btn-outline w-full'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          );
        })}
      </div>

      {/* Commercial Guarantee Callout */}
      <div className="card p-6 sm:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface-2/60 border-border/80">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-1 text-left">
            <h4 className="text-sm sm:text-base font-bold text-ink font-display">
              Commercial License Included on All Plans
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Every generation synthesized on Fish Audio comes with full commercial rights for YouTube monetization, podcast distribution, client ads, and broadcast.
            </p>
          </div>
        </div>
        <Link href="/commercial-use" className="btn-outline !py-2 !px-4 !text-xs shrink-0 whitespace-nowrap">
          Read License Terms
        </Link>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-ink tracking-tight">
            Detailed Plan Comparison
          </h3>
          <p className="text-xs sm:text-sm text-muted">
            Compare limits, voice models, API features, and SLAs side-by-side.
          </p>
        </div>

        <div className="card overflow-hidden border border-border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2/80">
                  <th className="p-4 sm:p-5 font-bold text-ink w-2/5">Capability</th>
                  <th className="p-4 sm:p-5 font-bold text-ink text-center w-1/5">Free</th>
                  <th className="p-4 sm:p-5 font-bold text-accent text-center w-1/5 bg-accent-light/40">Creator Pro</th>
                  <th className="p-4 sm:p-5 font-bold text-ink text-center w-1/5">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonCategories.map((cat) => (
                  <React.Fragment key={cat.category}>
                    <tr className="bg-surface-2/40">
                      <td colSpan={4} className="p-3 sm:p-4 text-xs font-bold uppercase tracking-wider text-muted font-display">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((row) => (
                      <tr key={row.name} className="hover:bg-surface-2/30 transition-colors">
                        <td className="p-4 sm:p-5 font-medium text-ink-2">{row.name}</td>
                        <td className="p-4 sm:p-5 text-center text-muted">{row.free}</td>
                        <td className="p-4 sm:p-5 text-center font-semibold text-accent bg-accent-light/20">{row.pro}</td>
                        <td className="p-4 sm:p-5 text-center text-ink-2 font-medium">{row.ent}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
