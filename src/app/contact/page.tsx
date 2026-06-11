import { constructMetadata } from '@/lib/metadata';
import ContactClient from '@/components/ContactClient';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Contact Us — Fish Audio Online Support | Customer Help',
  description: "Have questions or feedback? Contact the Fish Audio Online support team. We're here to help with voice cloning, commercial licensing, and API access.",
  path: '/contact',
  useExactTitle: true,
  keywords: [
    "contact fish audio",
    "tts support",
    "voice generator help",
    "commercial license questions",
    "api support"
  ]
});

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fishaudio.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://fishaudio.online/contact"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="hidden md:block">
          <AdBanner type="728x90" />
        </div>
        <div className="md:hidden">
          <AdBanner type="320x50" />
        </div>
      </div>
    </div>
  );
}
