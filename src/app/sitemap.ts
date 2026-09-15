import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

// Base URL for the Fish Audio Online production site
const BASE_URL = 'https://fishaudio.online';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/voice-clone',
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

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    let priority = 0.8;
    let changeFrequency: 'weekly' | 'monthly' = 'monthly';

    if (route === '') {
      priority = 1.0;
      changeFrequency = 'weekly';
    } else if (route === '/voice-clone') {
      priority = 1.0;
      changeFrequency = 'weekly';
    } else if (route === '/ai-voice-generator' || route === '/free-text-to-speech') {
      priority = 0.9;
      changeFrequency = 'monthly';
    }

    return {
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
