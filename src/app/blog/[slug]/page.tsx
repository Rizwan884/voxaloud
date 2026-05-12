import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { constructMetadata } from '@/lib/metadata';
import InternalLinks from '@/components/sections/InternalLinks';
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
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

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
      "@id": `https://fishaudio.online/blog/${slug}`
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
          prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-ink
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-muted/90 prose-p:leading-[1.8] prose-p:font-medium prose-p:mb-6
          prose-strong:text-ink prose-strong:font-black
          prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-3 prose-ul:mb-8
          prose-li:text-muted/80 prose-li:font-medium
          prose-blockquote:border-l-4 prose-blockquote:border-l-ink prose-blockquote:bg-ink/[0.02] prose-blockquote:p-8 prose-blockquote:rounded-r-[2rem] prose-blockquote:italic prose-blockquote:text-ink/80 prose-blockquote:my-10
          prose-img:rounded-[2.5rem] prose-img:border prose-img:border-border prose-img:shadow-2xl prose-img:my-12
          prose-a:text-ink prose-a:underline prose-a:underline-offset-4 prose-a:decoration-ink/20 hover:prose-a:decoration-ink transition-colors
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

        <div className="pt-16 border-t border-border">
          <InternalLinks />
        </div>
      </main>
    </div>
  );
}
