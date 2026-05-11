import { MetadataRoute } from 'next';

const BASE_URL = 'https://fishaudio.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/ai-voice-generator',
    '/free-text-to-speech',
    '/text-to-voice',
    '/commercial-use',
    '/languages',
    '/pricing',
    '/faq',
    '/blog',
    '/privacy',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
