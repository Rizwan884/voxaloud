"use client";
import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function AdBlockDetector() {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    // Create a bait element
    const bait = document.createElement("div");
    // These classes are commonly blocked by AdBlockers
    bait.className = "ad-banner adbox doubleclick ad-wrap adsbox";
    bait.style.position = "absolute";
    bait.style.width = "1px";
    bait.style.height = "1px";
    bait.style.left = "-9999px";
    document.body.appendChild(bait);

    // Check after a short delay
    setTimeout(() => {
      const isBlocked = bait.offsetHeight === 0 || window.getComputedStyle(bait).display === "none";
      if (isBlocked) {
        setAdBlockDetected(true);
      } else {
        // Fallback check: Fetch an ad script
        fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors'
        }).catch(() => {
          setAdBlockDetected(true);
        });
      }
      bait.remove();
    }, 500);
  }, []);

  if (!adBlockDetected) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-paper p-8 rounded-3xl max-w-md w-full text-center shadow-2xl">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold font-display text-ink mb-4">Ad Blocker Detected</h2>
        <p className="text-muted mb-8 leading-relaxed">
          Fish Audio Online is 100% free because we show ads. Please support us by pausing your ad blocker or whitelisting our site to continue generating high-quality AI voices.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="w-full bg-ink text-paper h-12 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all"
        >
          I have paused it, Refresh Page
        </button>
      </div>
    </div>
  );
}
