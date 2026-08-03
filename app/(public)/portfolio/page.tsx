import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowDown } from 'lucide-react';
import { getAllProjects } from '@/lib/db/queries/projects';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { Badge } from '@/components/ui/Badge';
import { generateMetadata } from '@/lib/utils/seo';

export const revalidate = 60;

export const metadata = generateMetadata({
  title: 'Portfolio',
  description: 'Explore our completed and ongoing projects across Pakistan. See the quality and craftsmanship that defines Saibaan Construction.',
});

export default function PortfolioPage({
  searchParams,
}: {
  searchParams: { category?: string; status?: string };
}) {
  const category = searchParams.category || 'all';

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/portfolio-hero.jpg"
            alt="Saibaan Construction Portfolio"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121214]/95 via-[#121214]/70 to-[#121214]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/40" />
        </div>
        <div className="container relative z-10 pt-32">
          <div className="max-w-2xl">
            <span className="section-label mb-6">Our Work</span>
            <h1 className="font-heading text-white font-bold leading-[1.1] text-5xl md:text-6xl lg:text-7xl mb-6">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              A showcase of our finest work, demonstrating our commitment to excellence, innovation, and superior craftsmanship in every detail.
            </p>
            <div className="flex items-center gap-3 text-[var(--text-secondary)] text-sm">
              <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center animate-bounce">
                <ArrowDown size={14} />
              </div>
              <span className="uppercase tracking-widest text-xs">Scroll to explore</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--bg-base)] min-h-[50vh]">
        <div className="container">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link 
              href="/portfolio" 
              prefetch={false}
              className={`btn btn-sm ${category === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            >
              All Projects
            </Link>
            <Link 
              href="/portfolio?category=architecture" 
              prefetch={false}
              className={`btn btn-sm ${category === 'architecture' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Architecture
            </Link>
            <Link 
              href="/portfolio?category=interior-design" 
              prefetch={false}
              className={`btn btn-sm ${category === 'interior-design' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Interior Design
            </Link>
             <Link 
              href="/portfolio?category=grey-structure" 
              prefetch={false}
              className={`btn btn-sm ${category === 'grey-structure' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Grey Structure
            </Link>
          </div>

          <React.Suspense fallback={<GridSkeleton />}>
            <PortfolioGrid searchParams={searchParams} />
          </React.Suspense>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-[var(--radius-lg)] relative aspect-square bg-[var(--bg-surface-1)] border border-[var(--border)] overflow-hidden">
          <div className="absolute inset-0 bg-[var(--border)] animate-pulse" />
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
            <div className="w-20 h-6 bg-[var(--bg-surface-1)] rounded animate-pulse" />
            <div>
              <div className="h-8 bg-[var(--bg-surface-1)] rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-4 bg-[var(--bg-surface-1)] rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function PortfolioGrid({ searchParams }: { searchParams: { category?: string; status?: string } }) {
  const category = searchParams.category || 'all';
  const status = searchParams.status || 'all';
  
  const projects = await getAllProjects(category, status);

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-heading text-white mb-2">No projects found</h3>
        <p className="text-[var(--text-muted)]">Check back later or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link 
          href={`/portfolio/${project.slug}`} 
          key={project.id}
          className="group block overflow-hidden rounded-[var(--radius-lg)] relative aspect-square"
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
          
          <Image
            src={project.coverImage || '/og-image.jpg'}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <Badge variant="gold" className="backdrop-blur-md bg-black/40">
                {project.category.replace('-', ' ')}
              </Badge>
              {project.status === 'ongoing' && (
                <Badge variant="muted" className="backdrop-blur-md bg-black/40 text-xs py-1">
                  Ongoing
                </Badge>
              )}
            </div>
            
            <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-2xl font-heading font-bold text-white mb-2">
                {project.title}
              </h3>
              {project.location && (
                <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                  <MapPin size={14} className="text-gold" />
                  {project.location}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
