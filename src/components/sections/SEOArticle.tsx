import React from 'react';

interface SEOArticleProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export default function SEOArticle({ title, subtitle, content }: SEOArticleProps) {
  return (
    <section className="py-24 border-t border-border mt-24">
      <div className="max-w-4xl mx-auto space-y-12 px-4 md:px-0">
        <header className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black font-display text-ink uppercase tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-muted font-medium italic">
            {subtitle}
          </p>
        </header>
        <article className="prose prose-lg prose-ink max-w-none 
          prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
          prose-p:text-muted/80 prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-ink prose-strong:font-black
          prose-ul:list-none prose-ul:pl-0
          prose-li:pl-8 prose-li:relative prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.6em] prose-li:before:w-4 prose-li:before:h-[2px] prose-li:before:bg-ink/20
        ">
          {content}
        </article>
      </div>
    </section>
  );
}
