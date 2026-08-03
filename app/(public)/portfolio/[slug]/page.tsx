import * as React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Maximize, Target, CheckCircle2 } from 'lucide-react';
import { getProjectBySlug, getRelatedProjects } from '@/lib/db/queries/projects';
import { Badge } from '@/components/ui/Badge';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return getSeoMetadata({
    title: project.title,
    description: project.description || `Explore ${project.title} by Saibaan Construction.`,
    image: project.coverImage || undefined,
  });
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) notFound();

  const relatedProjects = await getRelatedProjects(project.category, project.id);

  const categoryLabel = project.category
    .split('-')
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <>
      {/* ─── HERO SECTION ─────────────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.coverImage || '/og-image.jpg'}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/40 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 pb-16">
          {/* Back Link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-[var(--gold)] mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Badge variant="gold">{categoryLabel}</Badge>
            <Badge variant={project.status === 'completed' ? 'success' : 'muted'}>
              {project.status === 'completed' ? 'Completed' : 'Ongoing'}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white max-w-4xl leading-tight mb-6">
            {project.title}
          </h1>

          {/* Quick Meta Row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
            {project.location && (
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-[var(--gold)]" />
                {project.location}
              </span>
            )}
            {project.year && (
              <span className="flex items-center gap-2">
                <Calendar size={15} className="text-[var(--gold)]" />
                {project.year}
              </span>
            )}
            {project.areaSqft && (
              <span className="flex items-center gap-2">
                <Maximize size={15} className="text-[var(--gold)]" />
                {project.areaSqft.toLocaleString()} Sq. Ft.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ─── DETAILS + IMAGE SECTION ──────────────────────────────────────────── */}
      <section className="section bg-[var(--bg-base)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* LEFT — Image */}
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <Image
                  src={project.coverImage || '/og-image.jpg'}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle inner glow border */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-[var(--bg-surface-1)] border border-[var(--gold-border)] rounded-2xl px-6 py-4 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Category</p>
                <p className="text-[var(--gold)] font-bold font-heading text-lg">{categoryLabel}</p>
              </div>

              {/* Decorative gold circles */}
              <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full border border-[var(--gold-border)] opacity-30 pointer-events-none" />
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border border-[var(--gold-border)] opacity-40 pointer-events-none" />
            </div>

            {/* RIGHT — Details */}
            <div>
              <span className="section-label">Project Overview</span>
              <h2 className="section-title text-white mb-6">About This Project</h2>

              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
                {project.description || 'This is an exceptional construction project crafted with precision and luxury finishes by Saibaan Construction. Each detail reflects our commitment to quality and client satisfaction.'}
              </p>

              {/* Project Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {project.location && (
                  <div className="bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--gold-border)] transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-[var(--gold-subtle)] flex items-center justify-center mb-3">
                      <MapPin size={17} className="text-[var(--gold)]" />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Location</p>
                    <p className="text-white font-semibold text-sm">{project.location}</p>
                  </div>
                )}
                {project.year && (
                  <div className="bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--gold-border)] transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-[var(--gold-subtle)] flex items-center justify-center mb-3">
                      <Calendar size={17} className="text-[var(--gold)]" />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Year</p>
                    <p className="text-white font-semibold text-sm">{project.year}</p>
                  </div>
                )}
                {project.areaSqft && (
                  <div className="bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--gold-border)] transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-[var(--gold-subtle)] flex items-center justify-center mb-3">
                      <Maximize size={17} className="text-[var(--gold)]" />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Area</p>
                    <p className="text-white font-semibold text-sm">{project.areaSqft.toLocaleString()} Sq. Ft.</p>
                  </div>
                )}
                {project.status && (
                  <div className="bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--gold-border)] transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-[var(--gold-subtle)] flex items-center justify-center mb-3">
                      <Target size={17} className="text-[var(--gold)]" />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Status</p>
                    <p className="text-white font-semibold text-sm capitalize">{project.status}</p>
                  </div>
                )}
              </div>

              {/* Services */}
              {project.services && project.services.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Services Provided</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s: string) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gold-subtle)] border border-[var(--gold-border)] rounded-full text-sm text-[var(--gold)] font-medium"
                      >
                        <CheckCircle2 size={13} />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-10">
                <Link
                  href="/get-quotation"
                  className="btn btn-primary flex items-center gap-2 w-fit shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all"
                >
                  Start a Similar Project <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── GALLERY (if extra images) ────────────────────────────────────────── */}
      {project.images && project.images.length > 0 && (
        <section className="section bg-[var(--bg-surface-1)] border-t border-[var(--border)]">
          <div className="container">
            <div className="text-center mb-12">
              <span className="section-label">Gallery</span>
              <h2 className="section-title text-white">Project Gallery</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.images.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <Image
                    src={img}
                    alt={`${project.title} — image ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── RELATED PROJECTS ─────────────────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="section bg-[var(--bg-base)] border-t border-[var(--border)]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="section-label">Explore More</span>
                <h2 className="section-title text-white">Related Projects</h2>
              </div>
              <Link href="/portfolio" className="btn btn-outline flex-shrink-0">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rp) => (
                <Link
                  href={`/portfolio/${rp.slug}`}
                  key={rp.id}
                  className="group block overflow-hidden rounded-2xl relative aspect-[4/3]"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                  <Image
                    src={rp.coverImage || '/og-image.jpg'}
                    alt={rp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                    <p className="text-xs text-[var(--gold)] uppercase tracking-wider mb-1">
                      {rp.category.split('-').join(' ')}
                    </p>
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-[var(--gold)] transition-colors">
                      {rp.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-sm text-white/60 mt-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
