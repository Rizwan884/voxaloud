import { constructMetadata } from '@/lib/metadata';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = constructMetadata({
  title: 'AI Voice & TTS Blog',
  description: 'Stay updated with the latest trends in AI voice generation, text-to-speech technology, and creative content guides.',
  path: '/blog',
});

const posts = [
  { id: 1, title: 'The Future of Neural Text-to-Speech', date: 'May 10, 2026', category: 'Technology', desc: 'Exploring the latest breakthroughs in high-fidelity voice synthesis and emotional intelligence in AI voices.' },
  { id: 2, title: 'How to Choose the Right AI Voice for Your Brand', date: 'May 05, 2026', category: 'Marketing', desc: 'A guide to matching your brand personality with the perfect AI narrator for advertisements and social media.' },
  { id: 3, title: 'Optimizing TTS for YouTube and Podcasts', date: 'April 28, 2026', category: 'Guides', desc: 'Pro tips on using AI voices to scale your content production while maintaining high engagement rates.' }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-24 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold font-display text-ink">
            Fish Audio Blog
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Insights, guides, and updates from the world of AI voice generation.
          </p>
        </header>

        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="card-surface p-8 group cursor-pointer hover:border-ink transition-all">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-ink bg-surface px-3 py-1 rounded-full border border-border">
                  {post.category}
                </span>
                <span className="text-xs text-muted font-medium">{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-ink font-display mb-3 group-hover:text-ink transition-colors">
                {post.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {post.desc}
              </p>
              <div className="flex items-center gap-2 text-ink font-bold text-sm">
                Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
