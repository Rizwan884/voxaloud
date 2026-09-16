import React from 'react';

interface SEOArticleProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export default function SEOArticle({ title, subtitle, content }: SEOArticleProps) {
  return (
    <section className="py-16 sm:py-20 border-t border-border/80">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="space-y-2 text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-ink tracking-tight leading-snug">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-muted font-normal">
              {subtitle}
            </p>
          )}
        </header>

        <article className="prose prose-zinc max-w-none space-y-6 text-ink-2 text-sm sm:text-base leading-relaxed
          [&>h3]:text-xl [&>h3]:font-bold [&>h3]:font-display [&>h3]:text-ink [&>h3]:pt-4 [&>h3]:tracking-tight
          [&>p]:text-muted [&>p]:leading-relaxed
          [&>strong]:text-ink [&>strong]:font-semibold
          [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:text-muted
          [&>ul>li>strong]:text-ink
        ">
          {content}
        </article>
      </div>
    </section>
  );
}
