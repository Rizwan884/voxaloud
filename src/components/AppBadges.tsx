import Image from 'next/image';

export const APP_STORE_URL = 'https://apps.apple.com/app/id6775396336';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.fishaudio.studio&hl=en';

interface Props {
  className?: string;
  size?: 'compact' | 'default' | 'large';
  /** Badges are black-on-transparent by default (their official style) — on
   * a dark section, wrap them in a light card instead of recoloring them. */
  onDark?: boolean;
}

const SIZES = { compact: { w: 100, h: 30 }, default: { w: 140, h: 42 }, large: { w: 190, h: 56 } };

export default function AppBadges({ className = '', size = 'default', onDark = false }: Props) {
  const { w, h } = SIZES[size];
  const wrapClass = onDark ? 'bg-paper rounded-xl p-1.5 shadow-md' : '';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex hover:opacity-80 active:scale-[0.98] transition-all ${wrapClass}`}
        aria-label="Download Fish Audio on the App Store"
      >
        <Image
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us"
          alt="Download on the App Store"
          width={w}
          height={h}
          style={{ height: h, width: 'auto' }}
          unoptimized
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex hover:opacity-80 active:scale-[0.98] transition-all ${wrapClass}`}
        aria-label="Get Fish Audio on Google Play"
      >
        <Image
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          alt="Get it on Google Play"
          width={w}
          height={h}
          style={{ height: h, width: 'auto' }}
          unoptimized
        />
      </a>
    </div>
  );
}
