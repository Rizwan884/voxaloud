import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { constructMetadata } from '@/lib/metadata';
import InternalLinks from '@/components/sections/InternalLinks';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return {};

  return constructMetadata({
    title: post.metadata.title,
    description: post.metadata.excerpt,
    path: `/blog/${params.slug}`,
  });
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

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
        "url": "https://fishaudio.online/branding/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fishaudio.online/blog/${params.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-24 space-y-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-ink transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <header className="space-y-6">
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted/60">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.metadata.date}
            </span>
            <span className="flex items-center gap-1">
              <User size={14} />
              {post.metadata.author}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display text-ink leading-tight uppercase tracking-tight">
            {post.metadata.title}
          </h1>
          {post.metadata.coverImage && (
            <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-ink/5 border border-border relative">
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

        <article className="prose prose-lg prose-ink max-w-none 
          prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
          prose-p:text-muted/80 prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-ink prose-strong:font-black
          prose-blockquote:border-l-ink prose-blockquote:bg-ink/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl
          prose-img:rounded-[2rem] prose-img:border prose-img:border-border
        ">
          <MDXRemote source={post.content} />
        </article>

        <div className="pt-16 border-t border-border">
          <InternalLinks />
        </div>
      </main>
    </div>
  );
}
