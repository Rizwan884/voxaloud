import { constructMetadata } from '@/lib/metadata';
import AuthForm from '@/components/auth/AuthForm';

export const metadata = constructMetadata({
  title: 'Log In | Fish Audio',
  description: 'Log in to Fish Audio Online to access your cloned voices and generation history.',
  path: '/login',
  useExactTitle: true,
});

export default function LoginPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-surface dot-grid">
      <AuthForm mode="login" />
    </main>
  );
}
