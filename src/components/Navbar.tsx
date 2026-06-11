"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'AI Generator', href: '/ai-voice-generator' },
    { label: 'Languages', href: '/languages' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-paper/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/branding/app-icon.png" 
            alt="Fish Audio Online — free AI text to speech generator with natural voices" 
            width={40} 
            height={40} 
            className="object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform" 
            priority
          />
          <div className="flex flex-col">
            <span className="text-base font-bold text-ink font-display leading-none">Fish Audio Online</span>
            <span className="text-[9px] text-muted uppercase tracking-widest font-semibold mt-0.5">Neural TTS</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-wider text-muted">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-ink transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/" className="btn-primary !px-5 !py-2 !rounded-full !text-[11px] uppercase tracking-wider">
            Studio
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-muted hover:text-ink focus:outline-none"
          aria-label="Open Menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
            />

            {/* Slide-in Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-80 max-w-[85vw] h-full bg-paper shadow-2xl p-6 flex flex-col justify-between border-l border-border"
            >
              <div className="space-y-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Image 
                      src="/branding/app-icon.png" 
                      alt="Logo" 
                      width={32} 
                      height={32} 
                      className="object-contain"
                    />
                    <span className="text-sm font-black text-ink uppercase tracking-tight">Navigation</span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-muted hover:text-ink hover:bg-surface-2 rounded-full transition-all"
                    aria-label="Close Menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* List Links */}
                <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-wider text-muted">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="hover:text-ink transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="pt-6 border-t border-border">
                <Link 
                  href="/" 
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full !py-3.5 !rounded-xl text-center uppercase tracking-widest text-xs font-black shadow-md shadow-ink/10"
                >
                  Go to Studio
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
