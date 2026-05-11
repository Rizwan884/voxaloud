import { constructMetadata } from '@/lib/metadata';
import ContactClient from '@/components/ContactClient';

export const metadata = constructMetadata({
  title: 'Contact Us | Fish Audio Online Support',
  description: 'Have questions or feedback? Reach out to the Fish Audio team for support, business inquiries, or technical assistance.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface">
      <ContactClient />
    </div>
  );
}
