import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { constructMetadata } from '@/lib/metadata';
import InternalLinks from '@/components/sections/InternalLinks';
import AdBanner from '@/components/AdBanner';
import remarkGfm from 'remark-gfm';

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-10">
        
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
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              }
            }}
          />
        </article>

        {/* Responsive In-Content Ad */}
        <AdBanner type="responsive" label={true} />

        {/* Internal SEO Interlinking */}
        <InternalLinks />

      </div>
    </main>
  );
}
