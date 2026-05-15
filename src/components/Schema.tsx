import React from 'react';

export default function Schema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fish Audio Online",
    "url": "https://fishaudio.online",
    "logo": "https://fishaudio.online/branding/app-icon.png",
    "sameAs": [
      "https://twitter.com/fishaudio",
      "https://github.com/rizwan884"
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Fish Audio AI Voice Generator",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "The world's most advanced neural text-to-speech platform. Generate ultra-realistic AI voices instantly."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Fish Audio really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Fish Audio offers a generous free tier for creators to generate high-quality AI voices for their projects."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use AI voices for commercial use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You own the audio you generate on Fish Audio, making it perfect for YouTube, podcasts, and advertising."
        }
      },
      {
        "@type": "Question",
        "name": "How many languages are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support over 75 languages and numerous regional accents from around the world."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
