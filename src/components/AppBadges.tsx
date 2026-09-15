import Image from 'next/image';

export const APP_STORE_URL = 'https://apps.apple.com/app/id6775396336';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.fishaudio.studio&hl=en';

interface Props {
  className?: string;
  size?: 'default' | 'compact';
}

export default function AppBadges({ className = '', size = 'default' }: Props) {
  const h = size === 'compact' ? 30 : 42;
  const w = size === 'compact' ? 100 : 140;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-80 active:scale-[0.98] transition-all"
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
        className="inline-block hover:opacity-80 active:scale-[0.98] transition-all"
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
