import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag } from 'lucide-react';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'Blog | AI Voice Insights & Guides',
  description: 'Stay updated with the latest trends in AI voice generation, neural speech synthesis, and digital content creation.',
  path: '/blog',
});

export default async function BlogIndex() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-surface">
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-24 space-y-16">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-7xl font-black font-display text-ink uppercase tracking-tight">
            Our <span className="text-muted">Blog.</span>
          </h1>
          <p className="text-muted/80 max-w-2xl mx-auto font-medium">
            Expert insights into the world of neural speech synthesis and creative technology.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="flex flex-col h-full card hover:border-ink/20 transition-all group overflow-hidden"
            >
              <div className="aspect-video bg-ink/5 relative overflow-hidden">
                {post.coverImage && (
                  <Image 
                    src={post.coverImage} 
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-8 flex-1 flex flex-col space-y-4">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted/60">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {post.author}
                  </span>
                </div>
                <h2 className="text-xl font-bold font-display text-ink leading-tight group-hover:text-ink/80 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted/70 line-clamp-3 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded bg-ink/5 text-[9px] font-bold uppercase tracking-wider text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24 bg-ink/5 rounded-[3rem] border border-dashed border-border">
            <p className="text-muted font-display font-black uppercase tracking-widest">Coming Soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
