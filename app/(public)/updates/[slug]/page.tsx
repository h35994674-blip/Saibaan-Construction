import * as React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getUpdateBySlug } from '@/lib/db/queries/updates';
import { formatDate } from '@/lib/utils/formatting';
import { Badge } from '@/components/ui/Badge';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const update = await getUpdateBySlug(params.slug);
  if (!update) return {};
  
  return getSeoMetadata({
    title: update.title,
    description: update.excerpt || undefined,
    image: update.coverImage || undefined,
  });
}

export default async function UpdateDetailPage({ params }: { params: { slug: string } }) {
  const update = await getUpdateBySlug(params.slug);
  
  if (!update) {
    notFound();
  }

  return (
    <>
      <article className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[var(--bg-base)]">
        <div className="container max-w-4xl">
          <Link href="/updates" className="inline-flex items-center text-sm font-semibold text-[var(--text-muted)] hover:text-gold mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Updates
          </Link>

          <div className="flex items-center gap-4 mb-6">
            {update.category && <Badge variant="gold">{update.category}</Badge>}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Calendar size={14} className="text-gold" />
              {formatDate(update.publishedAt)}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-10 leading-tight">
            {update.title}
          </h1>

          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-12 border border-[var(--border)]">
             <Image
                src={update.coverImage || '/og-image.jpg'}
                alt={update.title}
                fill
                className="object-cover"
                priority
              />
          </div>

          <div 
            className="prose prose-invert prose-gold max-w-none text-lg leading-relaxed prose-headings:font-heading prose-headings:text-white prose-a:text-gold hover:prose-a:text-gold-light prose-p:text-[var(--text-secondary)]"
            dangerouslySetInnerHTML={{ __html: update.content.replace(/\n/g, '<br />') }} // Simple markdown/line-break support for MVP
          />
        </div>
      </article>

      <CTABanner />
    </>
  );
}
