"use client";

import dynamic from "next/dynamic";

const VideoMakerStudio = dynamic(() => import("./VideoMakerStudio"), {
  loading: () => <div className="w-full h-[560px] bg-ink/5 animate-pulse rounded-2xl" />,
  ssr: false,
});

export default function DynamicVideoMaker() {
  return <VideoMakerStudio />;
}
