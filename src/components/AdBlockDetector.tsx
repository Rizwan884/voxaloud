"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ShieldAlert, RefreshCw, HelpCircle, AlertTriangle, Sparkles } from 'lucide-react';

export default function AdBlockDetector() {
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'ublock' | 'adblock' | 'brave' | 'other'>('ublock');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  // 1. Dynamic cosmetic test element: creates a real div with standard ad classes
  const runCosmeticTest = useCallback((): boolean => {
    if (typeof document === 'undefined') return false;

    const bait = document.createElement('div');
    bait.className = 'adsbox pub_300x250 pub_300x250m pub_728x90 text-ad textads banner-ads banner_ads adsbygoogle';
    bait.setAttribute(
      'style',
      'position: fixed !important; top: -9999px !important; left: -9999px !important; width: 300px !important; height: 250px !important; display: block !important;'
    );
    bait.innerHTML = '&nbsp;';

    document.body.appendChild(bait);

    const style = window.getComputedStyle(bait);
    const isHidden =
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      style.opacity === '0' ||
      bait.offsetHeight === 0 ||
      bait.clientHeight === 0 ||
      bait.offsetParent === null;

    bait.remove();
    return isHidden;
  }, []);

  // 2. Real script tag probe: injects standard ad script into the DOM
  const runScriptProbe = useCallback((): Promise<boolean> => {
    if (typeof document === 'undefined') return Promise.resolve(false);

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;

      const cleanup = () => {
        script.remove();
      };

      script.onerror = () => {
        cleanup();
        resolve(true); // Blocked by client extension
      };

      script.onload = () => {
        cleanup();
        resolve(false); // Succeeded, not blocked
      };

      // Timeout fallback in case request is silently stalled
      setTimeout(() => {
        cleanup();
        resolve(false);
      }, 2500);

      document.head.appendChild(script);
    });
  }, []);

  // 3. Network fetch probe: tests if ad network domains are blocked
  const runNetworkProbe = useCallback(async (): Promise<boolean> => {
    const testEndpoints = [
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
      'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
      'https://www.highrevenueformat.com/d3749f5b9a84ef088012c7ef8ffbc1ce/invoke.js',
    ];

    let blockedCount = 0;

    await Promise.all(
      testEndpoints.map(async (url) => {
        try {
          await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
          });
        } catch {
          // If network fetch threw TypeError: Failed to fetch (net::ERR_BLOCKED_BY_CLIENT)
          blockedCount += 1;
        }
      })
    );

    // If any known ad network domain was intercepted and blocked
    return blockedCount >= 1;
  }, []);

  // Full composite check
  const checkAdBlocker = useCallback(async (): Promise<boolean> => {
    // Only run if browser reports online to avoid false positives in offline mode
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return false;
    }

    // Run tests in parallel
    const cosmeticBlocked = runCosmeticTest();
    if (cosmeticBlocked) return true;

    const [scriptBlocked, networkBlocked] = await Promise.all([
      runScriptProbe(),
      runNetworkProbe(),
    ]);

    return scriptBlocked || networkBlocked;
  }, [runCosmeticTest, runScriptProbe, runNetworkProbe]);

  // Initial detection suite with staggered checks to catch extensions that inject after initial parse
  useEffect(() => {
    setMounted(true);

    const performDetection = async () => {
      const detected = await checkAdBlocker();
      if (detected) {
        setIsBlocked(true);
      }
    };

    // Immediate check
    performDetection();

    // Secondary checks at 600ms, 1500ms, and 3000ms
    const t1 = setTimeout(performDetection, 600);
    const t2 = setTimeout(performDetection, 1500);
    const t3 = setTimeout(performDetection, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [checkAdBlocker]);

  // Handle blocking side-effects: body locking and automatic polling recovery
  useEffect(() => {
    if (!isBlocked) {
      document.body.classList.remove('service-access-restricted');
      return;
    }

    // Apply strict lockdown CSS to body
    document.body.classList.add('service-access-restricted');

    // Auto-poll every 2.5 seconds: if user turns off their extension, automatically unblock!
    const pollInterval = setInterval(async () => {
      const stillBlocked = await checkAdBlocker();
      if (!stillBlocked) {
        setIsBlocked(false);
        document.body.classList.remove('service-access-restricted');
        window.location.reload();
      }
    }, 2500);

    return () => {
      clearInterval(pollInterval);
      document.body.classList.remove('service-access-restricted');
    };
  }, [isBlocked, checkAdBlocker]);

  const handleManualVerify = async () => {
    setIsVerifying(true);
    setFeedbackMessage(null);

    await new Promise((res) => setTimeout(res, 700));

    const stillBlocked = await checkAdBlocker();
    if (!stillBlocked) {
      setIsBlocked(false);
      document.body.classList.remove('service-access-restricted');
      window.location.reload();
    } else {
      setIsVerifying(false);
      setFeedbackMessage(
        'Ad blocker is still active. Please toggle off protection or whitelist this site in your extension, then try again.'
      );
    }
  };

  if (!mounted || !isBlocked) return null;

  // Mount unclosable modal via React Portal directly into body
  return createPortal(
    <aside
      id="service-shield-portal"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="security-notice-heading"
      className="fixed inset-0 z-[2147483647] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl select-none"
      style={{ isolation: 'isolate' }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Enforcement Card */}
      <div
        ref={portalContainerRef}
        className="relative w-full max-w-xl rounded-3xl bg-[#090b10] border border-red-500/30 shadow-2xl shadow-black overflow-hidden text-white flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-amber-500 to-indigo-500" />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 shadow-lg shadow-red-900/20">
              <ShieldAlert size={32} className="stroke-[2.2]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] font-bold tracking-wide uppercase mb-1">
                <AlertTriangle size={12} />
                <span>Ad Blocker Detected</span>
              </div>
              <h2
                id="security-notice-heading"
                className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white"
              >
                Please Disable Your Ad Blocker
              </h2>
            </div>
          </div>

          {/* Explanation */}
          <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl">
            <p>
              <strong className="text-white font-semibold">Fish Audio Online is 100% free for everyone</strong>. We do not charge subscription fees or gate our 25,000-character neural voice cloning and 500+ voices behind paywalls.
            </p>
            <p className="text-neutral-400">
              To keep our high-performance AI GPU clusters running, we rely exclusively on non-intrusive sponsor advertisements. Please whitelist our website to continue using our voice tools.
            </p>
          </div>

          {/* Step-by-Step Whitelisting Guide */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-400">
              <span className="flex items-center gap-1.5">
                <HelpCircle size={13} className="text-indigo-400" />
                <span>Quick steps to whitelist this site:</span>
              </span>
            </div>

            {/* Extension Tabs */}
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
                onClick={() => setActiveGuideTab('other')}
                className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer truncate ${
                  activeGuideTab === 'other'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Other
              </button>
            </div>

            {/* Guide Content */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-neutral-300 space-y-2">
              {activeGuideTab === 'ublock' && (
                <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                  <li>Click the <strong className="text-white">uBlock Origin</strong> icon in your browser toolbar.</li>
                  <li>Click the large blue/grey <strong className="text-white">Power (⏻)</strong> button to turn it off for this domain.</li>
                  <li>Click the verify button below to resume using Fish Audio.</li>
                </ol>
              )}

              {activeGuideTab === 'adblock' && (
                <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                  <li>Click the <strong className="text-white">AdBlock / AdBlock Plus</strong> icon in your toolbar.</li>
                  <li>Select <strong className="text-white">&ldquo;Don&apos;t run on pages on this site&rdquo;</strong> (or click Pause).</li>
                  <li>Click the verify button below to resume.</li>
                </ol>
              )}

              {activeGuideTab === 'brave' && (
                <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                  <li>Click the <strong className="text-white">Brave Lion (Shield)</strong> icon at the right of your address bar.</li>
                  <li>Toggle <strong className="text-white">&ldquo;Shields DOWN&rdquo;</strong> for fishaudio.online.</li>
                  <li>Click the verify button below to resume.</li>
                </ol>
              )}

              {activeGuideTab === 'other' && (
                <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                  <li>Click your ad blocker icon (AdGuard, Ghostery, Opera Ad Blocker, Edge tracker).</li>
                  <li>Select <strong className="text-white">&ldquo;Pause on this site&rdquo;</strong> or add to whitelist.</li>
                  <li>Click the verify button below to resume.</li>
                </ol>
              )}
            </div>
          </div>

          {/* Feedback error if still blocked */}
          {feedbackMessage && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle size={15} className="shrink-0 text-red-400" />
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleManualVerify}
              disabled={isVerifying}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw size={16} className={isVerifying ? 'animate-spin' : ''} />
              <span>{isVerifying ? 'Checking ad status…' : 'I Have Disabled My AdBlocker'}</span>
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
    </aside>,
    document.body
  );
}
