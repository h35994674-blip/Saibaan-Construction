import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/db/queries/projects';
import { Badge } from '@/components/ui/Badge';

export async function FeaturedPortfolio() {
  const projects = await getFeaturedProjects();

  if (!projects.length) return null;

  return (
    <section className="section bg-[var(--bg-base)]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title text-white mb-4">Our Masterpieces</h2>
            <p className="text-[var(--text-muted)] text-lg">
              Explore our curated selection of signature projects that define luxury, functionality, and architectural brilliance.
            </p>
          </div>
          <Link href="/portfolio" className="btn btn-outline flex-shrink-0">
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <Link 
              href={`/portfolio/${project.slug}`} 
              key={project.id}
              className="group block overflow-hidden rounded-[var(--radius-lg)] relative aspect-[4/3]"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
              
              <Image
                src={project.coverImage || '/og-image.jpg'}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8">
                <div className="flex justify-end">
                  <Badge variant="gold" className="backdrop-blur-md bg-black/40">
                    {project.category.replace('-', ' ')}
                  </Badge>
                </div>
                
                <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                    {project.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-gold" />
                        {project.location}
                      </span>
                    )}
                    <span className="flex items-center text-gold font-medium md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
