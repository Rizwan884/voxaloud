import { Metadata } from 'next';

const BASE_URL = 'https://fishaudio.online';

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function constructMetadata({
  title,
  description,
  path,
  image = '/branding/og-image.png',
}: MetadataProps): Metadata {
  const fullTitle = `${title} | Fish Audio`;
  const url = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Fish Audio Online',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@fishaudio',
    },
    icons: {
      icon: '/branding/app-icon.png',
      shortcut: '/branding/app-icon.png',
      apple: '/branding/app-icon.png',
    },
    metadataBase: new URL(BASE_URL),
  };
}
