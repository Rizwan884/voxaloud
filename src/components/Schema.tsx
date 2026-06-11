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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
