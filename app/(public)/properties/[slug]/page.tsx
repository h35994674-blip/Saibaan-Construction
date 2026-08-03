import * as React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Square, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { getPropertyBySlug, getRelatedProperties } from '@/lib/db/queries/properties';
import { Badge } from '@/components/ui/Badge';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { getSiteSettings } from '@/lib/db/queries/settings';
import { siteConfig } from '@/config/site';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return {};

  return {
    title: `${property.title} | Saibaan Construction`,
    description: property.description?.substring(0, 160) || `View details for ${property.title}`,
  };
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);
  
  if (!property) {
    notFound();
  }

  const related = await getRelatedProperties(property.type, property.id);
  const settings = await getSiteSettings();

  return (
    <>
      {/* Hero Image Section */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px] w-full pt-20">
        <div className="absolute inset-0 bg-[#111]">
          <Image
            src={property.coverImage || '/og-image.jpg'}
            alt={property.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/60 to-transparent z-10" />
        
        <div className="absolute bottom-0 inset-x-0 z-20 pb-12">
          <div className="container">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="gold">{property.status.replace('-', ' ').toUpperCase()}</Badge>
              <Badge variant="outline" className="bg-black/50 backdrop-blur-md text-white border-white/20">
                {property.type.toUpperCase()}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 max-w-4xl">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[var(--text-secondary)] text-lg">
              {property.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={18} className="text-gold" />
                  {property.location}
                </span>
              )}
              <span className="text-2xl font-bold text-gold ml-auto bg-black/40 backdrop-blur-md px-6 py-2 rounded-lg border border-[var(--gold-border)]">
                {property.price || 'Price on Request'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 bg-[var(--bg-base)] relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Details (Left 2/3) */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Key Stats Bar */}
              <div className="bg-[var(--bg-surface-1)] border border-[var(--border)] rounded-2xl p-6 md:p-8 flex flex-wrap justify-between items-center gap-6 shadow-lg shadow-black/20">
                {(property.marla || property.areaSqft) && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-wider">Area</span>
                    <span className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                      <Square size={20} className="text-gold" />
                      {property.marla ? `${property.marla} Marla` : `${property.areaSqft} SqFt`}
                    </span>
                  </div>
                )}
                {property.beds !== null && property.beds > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-wider">Bedrooms</span>
                    <span className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                      <Bed size={20} className="text-gold" />
                      {property.beds}
                    </span>
                  </div>
                )}
                {property.baths !== null && property.baths > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-wider">Bathrooms</span>
                    <span className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                      <Bath size={20} className="text-gold" />
                      {property.baths}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-6">Property Description</h3>
                  <div className="prose prose-invert prose-gold max-w-none text-[var(--text-secondary)] leading-relaxed">
                    {property.description.split('\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-6">Key Features & Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-[var(--bg-surface-1)] p-4 rounded-xl border border-[var(--border)]">
                        <CheckCircle2 size={20} className="text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery (If any additional images exist) */}
              {property.images && property.images.length > 0 && (
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-6">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)] group">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                        <Image src={img} alt={`${property.title} - Image ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (Right 1/3) */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-gradient-to-b from-[#111] to-[var(--bg-surface-1)] border border-[var(--gold-border)] rounded-2xl p-8 shadow-2xl">
                <div className="mb-8">
                  <h4 className="text-xl font-heading font-bold text-white mb-2">Interested in this property?</h4>
                  <p className="text-[var(--text-muted)] text-sm">
                    Contact our real estate experts for a viewing or more details.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Link href="/contact" className="btn bg-gold hover:bg-[#c9a84c] text-white w-full flex justify-center py-4 font-bold tracking-wide uppercase">
                    Contact Agent
                  </Link>
                  <Link href={`https://wa.me/${(settings?.phone || siteConfig.phone).replace(/[^0-9]/g, '')}`} target="_blank" className="btn btn-outline w-full flex justify-center py-4 border-[var(--border)] hover:border-green-500 hover:text-green-500">
                    WhatsApp Us
                  </Link>
                </div>
                
                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <p className="text-xs text-[var(--text-muted)] text-center">
                    Listing ID: {property.id.slice(-6).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Properties */}
      {related.length > 0 && (
        <section className="py-16 bg-[var(--bg-surface-1)] border-t border-[var(--border)]">
          <div className="container">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-8">Similar Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link key={rel.id} href={`/properties/${rel.slug}`} className="group block relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <Image src={rel.coverImage || '/og-image.jpg'} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 inset-x-0 p-5 z-20">
                    <h4 className="text-lg font-bold text-white mb-1 line-clamp-1">{rel.title}</h4>
                    <span className="text-gold font-medium">{rel.price || 'View Details'}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/properties" className="btn btn-outline inline-flex items-center gap-2">
                View All Listings <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
