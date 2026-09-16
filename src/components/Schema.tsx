import React from 'react';

export default function Schema() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Fish Audio Online",
      "url": "https://fishaudio.online",
      "logo": "https://fishaudio.online/branding/app-icon.png",
      "description": "High-fidelity AI voice cloning and text-to-speech generation platform.",
      "sameAs": [
        "https://twitter.com/fishaudio",
        "https://github.com/rizwan884"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Fish Audio Online",
      "url": "https://fishaudio.online",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://fishaudio.online/languages?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
