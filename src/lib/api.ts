export const getApiUrl = (path: string) => {
  const isNative = typeof window !== 'undefined' && (window as any).Capacitor;
  const fallbackUrl = 'https://voxaloud-worker.rizwan-rashid.workers.dev'; // Fallback to your deployed worker
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || (isNative ? fallbackUrl : '');
  return `${baseUrl}${path}`;
};
