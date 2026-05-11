'use client';

import dynamic from 'next/dynamic';

const StudioClient = dynamic(() => import('./StudioClient'), {
  loading: () => <div className="w-full h-[600px] bg-ink/5 animate-pulse rounded-[3rem]" />,
  ssr: false
});

export default function DynamicStudio({ initialVoices }: { initialVoices: any }) {
  return <StudioClient initialVoices={initialVoices} />;
}
