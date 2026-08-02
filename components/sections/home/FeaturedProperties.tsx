import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Bed, Bath, Square } from 'lucide-react';
import { getFeaturedProperties } from '@/lib/db/queries/properties';
import { Badge } from '@/components/ui/Badge';

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties();

  if (!properties.length) return null;

  return (
    <section className="section bg-[var(--bg-surface-2)] border-t border-[var(--border)]">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="section-label">Real Estate</span>
            <h2 className="section-title text-white mb-4">Featured Properties</h2>
            <p className="text-[var(--text-muted)] text-lg">
              Explore our handpicked selection of premium real estate available for sale and rent.
            </p>
          </div>
          <Link href="/properties" className="btn btn-outline flex-shrink-0">
            View All Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Link 
              href={`/properties/${property.slug}`} 
              key={property.id}
              className="group bg-[var(--bg-surface-1)] border border-[var(--border)] hover:border-[var(--gold-border)] rounded-xl overflow-hidden transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={property.coverImage || '/og-image.jpg'}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                  <Badge variant="gold" className="shadow-lg backdrop-blur-md px-2 py-0.5 text-[10px]">
                    {property.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="text-xl font-heading font-bold text-gold mb-1">
                    {property.price || 'Price on Request'}
                  </h3>
                  <h4 className="text-base font-medium text-white mb-2 line-clamp-1 group-hover:text-[var(--gold-light)] transition-colors">
                    {property.title}
                  </h4>
                  {property.location && (
                    <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <MapPin size={12} className="text-gold" />
                      {property.location}
                    </p>
                  )}
                </div>
                
                <div className="mt-auto pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  {(property.beds || property.baths) ? (
                    <div className="flex items-center gap-3">
                      {property.beds && (
                        <span className="flex items-center gap-1"><Bed size={14} className="text-[var(--text-muted)]"/> {property.beds}</span>
                      )}
                      {property.baths && (
                        <span className="flex items-center gap-1"><Bath size={14} className="text-[var(--text-muted)]"/> {property.baths}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-[var(--text-muted)] capitalize">{property.type}</span>
                  )}
                  
                  {(property.marla || property.areaSqft) && (
                    <div className="flex items-center gap-1 font-medium text-white">
                      <Square size={12} className="text-gold"/>
                      {property.marla ? `${property.marla} Marla` : `${property.areaSqft} SqFt`}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
