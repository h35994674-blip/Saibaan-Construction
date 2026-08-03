import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Square, MapPin, ArrowDown } from 'lucide-react';
import { getAllProperties } from '@/lib/db/queries/properties';
import { Badge } from '@/components/ui/Badge';
import { PropertySearch } from '@/components/forms/PropertySearch';
import { CTABanner } from '@/components/sections/home/CTABanner';

export const metadata = {
  title: 'Real Estate Properties | Saibaan Construction',
  description: 'Explore our exclusive real estate listings including houses, plots, and commercial spaces for sale or rent.',
};

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/properties-hero.jpg"
            alt="Saibaan Construction Properties"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121214]/95 via-[#121214]/70 to-[#121214]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-[#121214]/40" />
        </div>
        <div className="container relative z-10 pt-32">
          <div className="max-w-2xl">
            <span className="section-label mb-6">Real Estate</span>
            <h1 className="font-heading text-white font-bold leading-[1.1] text-5xl md:text-6xl lg:text-7xl mb-6">
              Exclusive <span className="text-gradient">Properties</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Discover premium real estate opportunities. Whether you are looking for your dream home, a lucrative commercial space, or a plot to build on — we have it.
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

      {/* Listings Grid */}
      <section className="section bg-[var(--bg-base)] min-h-[50vh] pt-0">
        <div className="container">
          <React.Suspense fallback={<div className="h-24 w-full animate-pulse bg-[var(--bg-surface-1)] rounded-2xl mb-12"></div>}>
            <PropertySearch />
          </React.Suspense>

          <React.Suspense fallback={<GridSkeleton />}>
            <PropertiesGrid searchParams={searchParams} />
          </React.Suspense>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-[420px] bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col">
          <div className="relative aspect-[4/3] bg-[var(--border)] animate-pulse" />
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div className="h-8 bg-[var(--border)] rounded w-1/3 mb-2 animate-pulse" />
              <div className="h-6 bg-[var(--border)] rounded w-3/4 mb-4 animate-pulse" />
            </div>
            <div className="h-10 bg-[var(--border)] rounded w-full mt-4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function PropertiesGrid({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const type = typeof searchParams.type === 'string' ? searchParams.type : undefined;
  const status = typeof searchParams.status === 'string' ? searchParams.status : undefined;
  const minPrice = typeof searchParams.minPrice === 'string' ? parseInt(searchParams.minPrice) : undefined;
  const maxPrice = typeof searchParams.maxPrice === 'string' ? parseInt(searchParams.maxPrice) : undefined;
  const beds = typeof searchParams.beds === 'string' ? parseInt(searchParams.beds) : undefined;
  const baths = typeof searchParams.baths === 'string' ? parseInt(searchParams.baths) : undefined;

  const properties = await getAllProperties({
    query,
    type,
    status,
    minPrice: minPrice && !isNaN(minPrice) ? minPrice : undefined,
    maxPrice: maxPrice && !isNaN(maxPrice) ? maxPrice : undefined,
    beds: beds && !isNaN(beds) ? beds : undefined,
    baths: baths && !isNaN(baths) ? baths : undefined,
  });

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl text-white font-heading font-medium mb-2">No properties listed yet</h3>
        <p className="text-[var(--text-muted)]">Check back soon for our latest real estate offerings.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <Badge variant={property.status.includes('sale') ? 'gold' : 'outline'} className="shadow-lg backdrop-blur-md">
                {property.status.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="shadow-lg backdrop-blur-md bg-black/40 text-white border-white/20">
                {property.type}
              </Badge>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
              <h3 className="text-2xl font-heading font-bold text-gold mb-1">
                {property.price || 'Price on Request'}
              </h3>
              <h4 className="text-lg font-medium text-white mb-2 line-clamp-1 group-hover:text-[var(--gold-light)] transition-colors">
                {property.title}
              </h4>
              {property.location && (
                <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">
                  <MapPin size={14} className="text-gold" />
                  {property.location}
                </p>
              )}
            </div>
            
            <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between text-sm text-[var(--text-secondary)]">
              {(property.beds || property.baths) ? (
                <div className="flex items-center gap-4">
                  {property.beds && (
                    <span className="flex items-center gap-1.5"><Bed size={16} className="text-[var(--text-muted)]"/> {property.beds} Beds</span>
                  )}
                  {property.baths && (
                    <span className="flex items-center gap-1.5"><Bath size={16} className="text-[var(--text-muted)]"/> {property.baths} Baths</span>
                  )}
                </div>
              ) : (
                <span className="text-[var(--text-muted)]">Real Estate Listing</span>
              )}
              
              {(property.marla || property.areaSqft) && (
                <div className="flex items-center gap-1.5 font-medium text-white">
                  <Square size={14} className="text-gold"/>
                  {property.marla ? `${property.marla} Marla` : `${property.areaSqft} SqFt`}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
