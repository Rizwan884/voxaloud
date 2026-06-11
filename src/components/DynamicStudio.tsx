'use client';

import dynamic from 'next/dynamic';

const StudioClient = dynamic(() => import('./StudioClient'), {
  loading: () => <div className="w-full h-[600px] bg-ink/5 animate-pulse rounded-[3rem]" />,
  ssr: false
});

interface Voice { id: string; name: string; gender: string; language: string; country: string; flag?: string; }

export default function DynamicStudio({ initialVoices }: { initialVoices: Voice[] }) {
  return <StudioClient initialVoices={initialVoices} />;
}
