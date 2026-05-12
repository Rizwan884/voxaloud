import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

const BASE_URL = 'https://fishaudio.online';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  
  const staticRoutes = [
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

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
