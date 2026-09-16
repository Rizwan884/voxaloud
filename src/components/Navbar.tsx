"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import UserMenu from '@/components/auth/UserMenu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Voice Clone', href: '/voice-clone', badge: 'New' },
    { label: 'AI Generator', href: '/ai-voice-generator' },
    { label: 'Languages', href: '/languages' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/85 backdrop-blur-md border-b border-border/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-1">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-border group-hover:scale-105 transition-transform duration-200">
            <Image 
              src="/branding/app-icon.png" 
              alt="Fish Audio Online — AI Voice Cloning & Text to Speech" 
              fill
              sizes="36px"
              className="object-contain" 
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold font-display text-ink leading-tight tracking-tight">
              Fish Audio
            </span>
            <span className="text-[10px] text-muted font-medium tracking-wide">
              Neural Voice Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label} 
                href={link.href} 
                className={`relative py-1 transition-colors duration-150 flex items-center gap-1.5 ${
                  isActive ? 'text-ink font-semibold' : 'hover:text-ink'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="bg-accent-light text-accent-text text-[10px] font-semibold px-2 py-0.5 rounded-full border border-accent-subtle">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-ink rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Group */}
        <div className="hidden md:flex items-center gap-3">
          <UserMenu />
          <Link 
            href="/voice-clone" 
            className="btn-accent !px-4 !py-2 !text-xs !font-semibold group"
          >
            <Sparkles size={14} className="text-white/80 group-hover:rotate-12 transition-transform" />
            <span>Clone Voice Free</span>
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-muted hover:text-ink focus:outline-none rounded-lg hover:bg-surface-2 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-80 max-w-[85vw] h-full bg-surface shadow-2xl p-6 flex flex-col justify-between border-l border-border"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 relative rounded-lg overflow-hidden border border-border">
                      <Image 
                        src="/branding/app-icon.png" 
                        alt="Logo" 
                        fill
                        sizes="28px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-bold font-display text-ink">Fish Audio Online</span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-muted hover:text-ink hover:bg-surface-2 rounded-lg transition-all"
                    aria-label="Close Menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                          isActive 
                            ? 'bg-surface-2 text-ink font-semibold' 
                            : 'text-muted hover:text-ink hover:bg-surface-2/60'
                        }`}
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="bg-accent-light text-accent-text text-[10px] font-semibold px-2 py-0.5 rounded-full border border-accent-subtle">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-border space-y-3">
                <UserMenu variant="mobile" />
                <Link
                  href="/voice-clone"
                  onClick={() => setIsOpen(false)}
                  className="btn-accent w-full !py-3 !rounded-xl text-center text-xs font-semibold shadow-md shadow-accent/20"
                >
                  Start Cloning Free
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
