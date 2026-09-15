import Image from 'next/image';

const APP_STORE_URL = 'https://apps.apple.com/app/id6775396336';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.fishaudio.studio&hl=en';

export default function AppBadges({ className = '' }: { className?: string }) {
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
          width={140}
          height={42}
          className="h-[42px] w-auto"
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
          width={140}
          height={42}
          className="h-[42px] w-auto"
          unoptimized
        />
      </a>
    </div>
  );
}
