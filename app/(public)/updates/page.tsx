import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { getAllUpdates } from '@/lib/db/queries/updates';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/formatting';
import { generateMetadata } from '@/lib/utils/seo';

export const revalidate = 60;

export const metadata = generateMetadata({
  title: 'Updates & News',
  description: 'Stay informed with the latest news, construction updates, and industry insights from Saibaan Construction.',
});

export default function UpdatesPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[var(--bg-base)]">
        <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center bg-fixed opacity-10 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/80 via-transparent to-[var(--bg-base)] z-0" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-[var(--gold-border)] bg-[var(--gold-subtle)]">
            <Newspaper size={14} className="text-gold" />
            <span className="text-gold text-xs font-bold tracking-widest uppercase">Saibaan Insights</span>
          </div>
          <h1 className="font-heading font-black text-white text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Updates &<br/>
            <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-xl leading-relaxed">
            Latest news, project milestones, and expert insights from the world of construction and design.
          </p>
        </div>
      </section>

      <section className="pb-32 bg-[var(--bg-base)] min-h-[50vh]">
        <div className="container">
          <React.Suspense fallback={<UpdatesSkeleton />}>
            <UpdatesGrid />
          </React.Suspense>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function UpdatesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--bg-surface-1)]">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-[var(--border)]" />
        <div className="p-10 md:p-14 flex flex-col justify-center gap-4">
          <div className="w-24 h-4 bg-[var(--border)] rounded" />
          <div className="w-3/4 h-8 bg-[var(--border)] rounded" />
          <div className="w-full h-24 bg-[var(--border)] rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface-1)] overflow-hidden">
            <div className="aspect-[16/10] bg-[var(--border)]" />
            <div className="p-7">
              <div className="w-20 h-4 bg-[var(--border)] rounded mb-4" />
              <div className="w-3/4 h-6 bg-[var(--border)] rounded mb-4" />
              <div className="w-full h-12 bg-[var(--border)] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function UpdatesGrid() {
  const updates = await getAllUpdates();
  const featured = updates[0];
  const rest = updates.slice(1);

  if (updates.length === 0) {
    return (
      <div className="text-center py-32 flex flex-col items-center">
        <Newspaper size={56} className="text-[var(--text-muted)] mb-6 opacity-40" />
        <h3 className="text-2xl font-heading font-bold text-white mb-3">No updates published yet.</h3>
        <p className="text-[var(--text-muted)]">Check back soon for the latest news and insights.</p>
      </div>
    );
  }

  return (
    <>
      {/* Featured Article (First Post) */}
      {featured && (
        <div className="mb-16 animate-fade-in-up">
          <Link href={`/updates/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--gold-border)] transition-all duration-500 bg-[var(--bg-surface-1)] shadow-2xl">
            {/* Image */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
              <Image
                src={featured.coverImage || '/og-image.jpg'}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-surface-1)] hidden lg:block" />
              {featured.category && (
                <div className="absolute top-6 left-6 z-10">
                  <Badge variant="gold" className="backdrop-blur-md bg-black/60">{featured.category}</Badge>
                </div>
              )}
              {/* Featured label */}
              <div className="absolute bottom-6 left-6 z-10 lg:hidden">
                <span className="text-xs font-bold uppercase tracking-widest text-gold/70 border border-gold/20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm">Featured</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-10 md:p-14 flex flex-col justify-center relative">
              <span className="text-xs font-bold uppercase tracking-widest text-gold/70 mb-4 hidden lg:block">Featured Article</span>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-5">
                <Calendar size={14} className="text-gold" />
                {formatDate(featured.publishedAt)}
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-5 group-hover:text-gold transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="inline-flex items-center gap-3 text-gold font-bold text-sm group-hover:gap-5 transition-all duration-300">
                Read Full Article <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Rest of Articles Grid */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-xl font-heading font-bold text-white">More Articles</h2>
            <div className="flex-1 h-[1px] bg-[var(--border)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((update, idx) => (
              <Link
                href={`/updates/${update.slug}`}
                key={update.id}
                className="group flex flex-col bg-[var(--bg-surface-1)] rounded-2xl border border-[var(--border)] overflow-hidden hover:border-[var(--gold-border)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={update.coverImage || '/og-image.jpg'}
                    alt={update.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface-1)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {update.category && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="gold" className="backdrop-blur-md bg-black/60 shadow-lg">
                        {update.category}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-4">
                    <Calendar size={12} className="text-gold" />
                    {formatDate(update.publishedAt)}
                  </div>

                  <h3 className="text-lg font-heading font-bold text-white mb-3 group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                    {update.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
                    {update.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold text-gold mt-auto group-hover:gap-4 transition-all duration-300">
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
