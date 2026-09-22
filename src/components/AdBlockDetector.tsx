"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import Script from 'next/script';
import { ShieldAlert, RefreshCw, CheckCircle2, HelpCircle, AlertTriangle, Sparkles, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    __adblock_bait_loaded?: boolean;
    canRunAds?: boolean;
  }
}

export default function AdBlockDetector() {
  const [isAdBlockActive, setIsAdBlockActive] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'ublock' | 'adblock' | 'brave' | 'safari'>('ublock');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const baitRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Core detection routine running multiple independent heuristic tests
  const checkAdBlock = useCallback(async (): Promise<boolean> => {
    // 1. Cosmetic / CSS element hiding test
    let cosmeticBlocked = false;
    if (baitRef.current) {
      const el = baitRef.current;
      const styles = window.getComputedStyle(el);
      if (
        styles.display === 'none' ||
        styles.visibility === 'hidden' ||
        styles.opacity === '0' ||
        el.offsetParent === null ||
        el.offsetHeight === 0 ||
        el.clientHeight === 0
      ) {
        cosmeticBlocked = true;
      }
    }

    // 2. Script bait execution test
    const scriptBlocked = !window.__adblock_bait_loaded;

    // 3. Network fetch bait test (probe standard EasyList ad script endpoint)
    let networkBlocked = false;
    try {
      const res = await fetch('/ads.js', { method: 'HEAD', cache: 'no-store' });
      if (!res.ok) {
        networkBlocked = true;
      }
    } catch {
      networkBlocked = true;
    }

    // 4. Remote advertising provider domain check
    let providerBlocked = false;
    try {
      await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      });
    } catch {
      providerBlocked = true;
    }

    // If cosmetic hiding is triggered OR multiple network probes fail, ad blocker is active
    return cosmeticBlocked || (scriptBlocked && networkBlocked) || (networkBlocked && providerBlocked);
  }, []);

  // Initial detection with brief delay for browser extensions to finish injection
  useEffect(() => {
    const timer = setTimeout(async () => {
      const detected = await checkAdBlock();
      if (detected) {
        setIsAdBlockActive(true);
      }
    }, 750);

    return () => clearTimeout(timer);
  }, [checkAdBlock]);

  // Lock scrolling and user interaction when ad block modal is active
  useEffect(() => {
    if (isAdBlockActive) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Anti-tamper: if user or extension attempts to hide or delete the modal, restore it
      const observer = new MutationObserver(() => {
        if (isAdBlockActive && modalRef.current && modalRef.current.style.display === 'none') {
          modalRef.current.style.display = 'flex';
        }
      });

      observer.observe(document.body, { attributes: true, childList: true, subtree: true });

      return () => {
        document.body.style.overflow = originalOverflow;
        observer.disconnect();
      };
    }
  }, [isAdBlockActive]);

  const handleVerify = async () => {
    setIsVerifying(true);
    setErrorMessage(null);

    // Give browser 500ms to process any whitelisting toggle
    await new Promise((resolve) => setTimeout(resolve, 600));

    const stillDetected = await checkAdBlock();
    if (!stillDetected) {
      setIsAdBlockActive(false);
      window.location.reload();
    } else {
      setIsVerifying(false);
      setErrorMessage('Ad blocker still active. Please ensure it is paused or disabled for fishaudio.online, then try again or reload the page.');
    }
  };

  return (
    <>
      {/* Script bait component: triggers EasyList URL-matching rules */}
      <Script
        src="/ads.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.__adblock_bait_loaded = true;
        }}
      />

      {/* Cosmetic bait DOM element: triggers EasyList CSS-hiding rules */}
      <div
        ref={baitRef}
        aria-hidden="true"
        className="adsbox ad-placement pub_300x250 pub_728x90 text-ad textads banner-ads banner_ads"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '1px',
          height: '1px',
          pointerEvents: 'none',
        }}
      >
        &nbsp;
      </div>

      {/* Unclosable Full-Screen Enforcement Modal */}
      {isAdBlockActive && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="adblock-title"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl select-none animate-in fade-in duration-300"
          style={{ isolation: 'isolate' }}
        >
          {/* Subtle ambient lighting effects */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Modal Container */}
          <div className="relative w-full max-w-xl rounded-3xl bg-[#0f1117] border border-red-500/20 shadow-2xl shadow-black/80 overflow-hidden text-white flex flex-col my-auto">
            
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-amber-500 to-indigo-500" />

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header Icon & Title */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 shadow-inner">
                  <ShieldAlert size={30} className="stroke-[2.2]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-[11px] font-bold tracking-wide uppercase mb-1">
                    <AlertTriangle size={12} />
                    <span>Access Restricted</span>
                  </div>
                  <h2 id="adblock-title" className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
                    Ad Blocker Detected
                  </h2>
                </div>
              </div>

              {/* Mission & Explanation */}
              <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed bg-white/[0.03] border border-white/[0.06] p-4 rounded-2xl">
                <p>
                  <strong className="text-white font-semibold">Fish Audio Online is completely free</strong>. We don&apos;t charge subscriptions or gate our 25,000-character neural voice cloning and 500+ voices behind paywalls.
                </p>
                <p className="text-neutral-400">
                  To keep our GPU computing clusters running free for everyone, we rely on non-intrusive sponsor advertisements. Please support the platform by whitelisting our website.
                </p>
              </div>

              {/* Instructions per Blocker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <HelpCircle size={13} className="text-indigo-400" />
                    <span>How to disable on your browser:</span>
                  </span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveGuideTab('ublock')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeGuideTab === 'ublock'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30 shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    uBlock
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveGuideTab('adblock')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeGuideTab === 'adblock'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30 shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    AdBlock
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveGuideTab('brave')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeGuideTab === 'brave'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Brave
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveGuideTab('safari')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                      activeGuideTab === 'safari'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Others
                  </button>
                </div>

                {/* Tab Guide Content */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-neutral-300 space-y-2">
                  {activeGuideTab === 'ublock' && (
                    <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                      <li>Click the <strong className="text-white">uBlock Origin</strong> icon in your browser extensions bar.</li>
                      <li>Click the large blue/grey <strong className="text-white">Power Button (⏻)</strong> to turn it off for this site.</li>
                      <li>Click <strong className="text-white">&ldquo;I Have Disabled My AdBlocker&rdquo;</strong> below.</li>
                    </ol>
                  )}

                  {activeGuideTab === 'adblock' && (
                    <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                      <li>Click the <strong className="text-white">AdBlock / AdBlock Plus</strong> icon in your toolbar.</li>
                      <li>Select <strong className="text-white">&ldquo;Don&apos;t run on pages on this site&rdquo;</strong> (or toggle Pause).</li>
                      <li>Click <strong className="text-white">&ldquo;I Have Disabled My AdBlocker&rdquo;</strong> below.</li>
                    </ol>
                  )}

                  {activeGuideTab === 'brave' && (
                    <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                      <li>Click the <strong className="text-white">Brave Lion (Shield)</strong> icon at the right of your address bar.</li>
                      <li>Toggle <strong className="text-white">&ldquo;Shields DOWN&rdquo;</strong> for fishaudio.online.</li>
                      <li>Click <strong className="text-white">&ldquo;I Have Disabled My AdBlocker&rdquo;</strong> below.</li>
                    </ol>
                  )}

                  {activeGuideTab === 'safari' && (
                    <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                      <li>Click your ad blocking extension icon (AdGuard, Ghostery, Opera Blocker).</li>
                      <li>Toggle <strong className="text-white">&ldquo;Whitelist this website&rdquo;</strong> or disable protection for this domain.</li>
                      <li>Click <strong className="text-white">&ldquo;I Have Disabled My AdBlocker&rdquo;</strong> below.</li>
                    </ol>
                  )}
                </div>
              </div>

              {/* Error notification if still blocked */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertTriangle size={15} className="shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <RefreshCw size={16} className={isVerifying ? 'animate-spin' : ''} />
                  <span>{isVerifying ? 'Verifying ads…' : 'I Have Disabled My AdBlocker'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="py-3.5 px-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 hover:text-white font-semibold text-sm border border-white/[0.08] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Reload Page</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <Sparkles size={12} className="text-indigo-400" />
                <span>Thank you for helping keep AI voice creation free for all creators!</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
