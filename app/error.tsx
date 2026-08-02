'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHeader
        title="Something went wrong"
        description="We've encountered an unexpected error."
      />
      <section className="section bg-[var(--bg-base)] flex items-center justify-center text-center min-h-[40vh]">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-2xl font-heading text-white mb-4">An error occurred</h3>
            <p className="text-[var(--text-muted)] mb-8">
              Our technical team has been notified. Please try again.
            </p>
            <button onClick={() => reset()} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
