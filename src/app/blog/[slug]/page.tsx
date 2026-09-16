import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, User, ArrowLeft, Clock, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { constructMetadata } from '@/lib/metadata';
import InternalLinks from '@/components/sections/InternalLinks';
import AdBanner from '@/components/AdBanner';
import AppBadges from '@/components/AppBadges';
import remarkGfm from 'remark-gfm';

const mdxComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href) return <span {...props}>{children}</span>;
    let finalHref = href;
    if (href.includes('id6766869439')) {
      finalHref = 'https://apps.apple.com/app/id6775396336';
    } else if (href.includes('com.fishaudio.ai.tts.clone')) {
      finalHref = 'https://play.google.com/store/apps/details?id=com.fishaudio.studio&hl=en';
    }
    const isInternal = finalHref.startsWith('/') || finalHref.startsWith('#');
    if (isInternal) {
      return (
        <Link href={finalHref} className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2 transition-colors" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={finalHref} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover font-semibold underline underline-offset-2 transition-colors" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    let resolvedSrc = src;
    if (typeof src === 'string' && (src === '/icon.png' || src.includes('icon.png'))) {
      resolvedSrc = '/branding/app-icon.png';
    }
    return (
      <img
        src={resolvedSrc}
        alt={alt || "Fish Audio Online"}
        loading="lazy"
        className="rounded-2xl max-w-full h-auto shadow-sm my-4 border border-border"
        {...props}
      />
    );
  },
  AppBadges,
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return constructMetadata({
    title: post.metadata.title,
    description: post.metadata.excerpt,
    path: `/blog/${slug}`,
    image: post.metadata.coverImage,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.metadata.title,
        "item": `https://fishaudio.online/blog/${slug}`
      }
    ]
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.metadata.title,
    "description": post.metadata.excerpt,
    "image": post.metadata.coverImage ? `https://fishaudio.online${post.metadata.coverImage}` : undefined,
    "datePublished": post.metadata.date,
    "author": {
      "@type": "Organization",
      "name": post.metadata.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fish Audio Online",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fishaudio.online/branding/app-icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fishaudio.online/blog/${slug}`
    }
  };

  return (
    <main className="min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12">
        
        {/* Navigation Breadcrumb Back */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-6 text-left">
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar size={13} />
              {post.metadata.date}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <User size={13} />
              {post.metadata.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-ink tracking-tight leading-[1.2]">
            {post.metadata.title}
          </h1>

          <p className="text-base sm:text-lg text-muted font-normal leading-relaxed">
            {post.metadata.excerpt}
          </p>

          {post.metadata.coverImage && (
            <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-surface-2 border border-border relative shadow-sm">
              <Image 
                src={post.metadata.coverImage} 
                alt={post.metadata.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Body */}
        <article className="prose prose-zinc max-w-none text-ink-2 text-base sm:text-lg leading-relaxed
          [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:font-display [&>h2]:text-ink [&>h2]:tracking-tight [&>h2]:mt-10 [&>h2]:mb-4
          [&>h3]:text-xl [&>h3]:font-bold [&>h3]:font-display [&>h3]:text-ink [&>h3]:tracking-tight [&>h3]:mt-8 [&>h3]:mb-3
          [&>p]:text-muted [&>p]:leading-relaxed [&>p]:mb-6
          [&>strong]:text-ink [&>strong]:font-semibold
          [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:text-muted [&>ul]:mb-6
          [&>ul>li>strong]:text-ink
          [&>blockquote]:border-l-4 [&>blockquote]:border-accent [&>blockquote]:bg-accent-light/30 [&>blockquote]:p-5 [&>blockquote]:rounded-r-2xl [&>blockquote]:italic [&>blockquote]:my-8
          [&>a]:text-accent [&>a]:font-semibold [&>a]:underline hover:[&>a]:text-accent-hover
        ">
          <MDXRemote 
            source={post.content} 
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              }
            }}
          />
        </article>

        {/* Dedicated Mobile & Web Studio Callout on EVERY blog article */}
        <section className="card p-6 sm:p-8 bg-surface-2/80 border border-border space-y-5 rounded-3xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 relative rounded-2xl overflow-hidden shadow-sm border border-border shrink-0">
                <Image src="/branding/app-icon.png" alt="Fish Audio App" fill sizes="48px" className="object-contain" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold font-display text-ink leading-tight">
                  Try Fish Audio Free on Mobile &amp; Web
                </h4>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  Instant 15-second voice cloning, 500+ voices &bull; Full commercial rights
                </p>
              </div>
            </div>
            <Link href="/voice-clone" className="btn-accent !px-5 !py-2.5 !text-xs !font-semibold shrink-0">
              <Sparkles size={14} />
              <span>Clone Voice Online</span>
            </Link>
          </div>
          <div className="pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-medium text-ink-2">
              Download the official mobile app:
            </p>
            <AppBadges size="default" />
          </div>
        </section>

        {/* Related Articles SEO Grid */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-6">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-accent" />
              <h3 className="text-xl font-bold font-display text-ink tracking-tight">
                Recommended Articles
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="card p-4 hover:border-accent/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <p className="text-[11px] text-muted">{rel.date}</p>
                    <h4 className="text-xs sm:text-sm font-bold font-display text-ink group-hover:text-accent transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-muted line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-accent mt-3">
                    <span>Read Guide</span>
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Internal SEO Interlinking */}
        <InternalLinks />

      </div>
    </main>
  );
}
