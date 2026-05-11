import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-12 md:py-20 mt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12 md:space-y-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <img src="/branding/logo.png" alt="Fish Audio Online" className="w-12 h-12 object-contain rounded-lg" />
            <span className="font-bold tracking-tight text-ink font-display text-lg">Fish Audio Studio</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold text-muted uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms</Link>
            <a href="mailto:support@fishaudio.online" className="hover:text-ink transition-colors">Contact Support</a>
          </div>
          <p className="text-[11px] text-muted font-bold uppercase tracking-widest">&copy; 2026 FISH AUDIO ONLINE</p>
        </div>

        <div className="pt-8 border-t border-border">
          <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-6 text-center">Supported languages</h5>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] font-semibold text-muted">
            {[
              "English", "العربية", "中文", "Français",
              "Deutsch", "हिंदी", "Italiano", "日本語", "한국어",
              "Português", "Русский", "Español", "Türkçe", "اردو"
            ].map((lang) => (
              <span key={lang} className="hover:text-ink transition-colors cursor-default px-2 py-1 bg-paper rounded-md border border-border">{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
