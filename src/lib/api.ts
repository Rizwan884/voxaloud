export const getApiUrl = (path: string) => {
  const fallbackUrl = 'https://voxaloud-worker.rizwan-rashid.workers.dev'; // Fallback to your deployed worker
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || fallbackUrl;
  return `${baseUrl}${path}`;
};
