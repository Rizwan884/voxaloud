import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { constructMetadata } from '@/lib/metadata';
import AdBanner from '@/components/AdBanner';

export const metadata = constructMetadata({
  title: 'Blog & Tutorials | AI Voice Insights & Guides',
  description: 'Guides, tutorials, and deep dives into neural speech synthesis, instant voice cloning, and audio content workflows.',
  path: '/blog',
});

export default async function BlogIndex() {
  const posts = await getBlogPosts();

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
        "name": "Blog",
        "item": "https://fishaudio.online/blog"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-20">
        
        {/* Header */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-light border border-accent-subtle text-accent-text text-xs font-semibold shadow-xs">
            <BookOpen size={13} className="text-accent" />
            <span>Guides &bull; Deep Dives &bull; Audio Engineering</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-ink tracking-tight leading-[1.1]">
            Neural voice insights <br />
            <span className="text-muted font-normal">and creator guides.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
            Practical tutorials on zero-shot voice cloning, multilingual narration, and maximizing speech synthesis quality.
          </p>
        </header>

        {/* Post Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="card flex flex-col justify-between overflow-hidden group hover:border-accent/40 transition-all duration-200"
              >
                <div>
                  {/* Cover Image */}
                  <div className="aspect-[16/10] bg-surface-2 relative overflow-hidden">
                    {post.coverImage ? (
                      <Image 
                        src={post.coverImage} 
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted">
                        <BookOpen size={32} className="opacity-30" />
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {post.date}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <User size={13} />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold font-display text-ink group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3 font-normal">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-accent">
                  <span>Read Article</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center text-muted space-y-2 max-w-md mx-auto">
            <p className="text-sm font-semibold text-ink">No articles published yet.</p>
            <p className="text-xs">Check back soon for new guides and announcements.</p>
          </div>
        )}

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

      </div>
    </main>
  );
}
