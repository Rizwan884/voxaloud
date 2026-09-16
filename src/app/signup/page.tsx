import { constructMetadata } from '@/lib/metadata';
import AuthForm from '@/components/auth/AuthForm';

export const metadata = constructMetadata({
  title: 'Sign Up Free | Fish Audio',
  description: 'Create a free Fish Audio Online account to clone voices and generate natural AI speech.',
  path: '/signup',
  useExactTitle: true,
});

export default function SignupPage() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-canvas dot-grid">
      <AuthForm mode="signup" />
    </main>
  );
}
