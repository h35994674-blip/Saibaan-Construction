import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
      />
      <section className="section bg-[var(--bg-base)] flex items-center justify-center text-center min-h-[40vh]">
        <div className="container">
          <div className="max-w-md mx-auto">
            <h2 className="text-[120px] font-heading font-bold text-[var(--gold-subtle)] leading-none mb-6">404</h2>
            <h3 className="text-2xl font-heading text-white mb-4">Oops! We couldn't find that page.</h3>
            <p className="text-[var(--text-muted)] mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link href="/" className="btn btn-primary">
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
