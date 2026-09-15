'use client';

import dynamic from 'next/dynamic';

const VoiceCloneStudio = dynamic(() => import('./VoiceCloneStudio'), {
  loading: () => <div className="w-full h-[420px] bg-ink/5 animate-pulse rounded-2xl" />,
  ssr: false,
});

export default function DynamicVoiceClone({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  return <VoiceCloneStudio variant={variant} />;
}
