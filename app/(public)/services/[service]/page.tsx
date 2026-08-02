import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { PageHeader } from '@/components/layout/PageHeader';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';

export async function generateStaticParams() {
  return siteConfig.services.map((s) => ({
    service: s.slug,
  }));
}

export async function generateMetadata({ params }: { params: { service: string } }) {
  const serviceData = siteConfig.services.find((s) => s.slug === params.service);
  if (!serviceData) return {};
  
  return getSeoMetadata({
    title: serviceData.title,
    description: serviceData.description,
  });
}

export default function ServiceDetailPage({ params }: { params: { service: string } }) {
  const serviceData = siteConfig.services.find((s) => s.slug === params.service);
  
  if (!serviceData) {
    notFound();
  }

  // Mock specific details for the service page
  const features = [
    'Comprehensive consultation and planning',
    'Customized design tailored to your vision',
    'Premium materials and expert craftsmanship',
    'Strict adherence to timelines and budgets',
    'Dedicated project management',
    'Post-completion support and warranty',
  ];

  return (
    <>
      <PageHeader
        title={serviceData.title}
        description={serviceData.description}
      />
      
      <section className="section bg-[var(--bg-base)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Placeholder */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--bg-surface-2)] border border-[var(--border)]">
              <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)] flex-col gap-4">
                {/* In a real app, this would be an Image component */}
                <div className="w-20 h-20 rounded-full bg-[var(--gold-subtle)] flex items-center justify-center border border-[var(--gold-border)] text-gold">
                   <span className="text-3xl font-heading font-bold">{serviceData.shortTitle[0]}</span>
                </div>
                <p>Image placeholder for {serviceData.title}</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="section-label">Overview</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Excellence in {serviceData.shortTitle}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                At Saiban Construction, our {serviceData.title.toLowerCase()} are designed to exceed expectations. We combine innovative techniques with proven methodologies to deliver results that are both visually stunning and structurally sound.
              </p>
              
              <h3 className="text-xl font-heading font-semibold text-white mb-6">
                What's Included
              </h3>
              <ul className="space-y-4 mb-10">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-gold shrink-0 mt-1" size={20} />
                    <span className="text-[var(--text-primary)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-4">
                <Link href={`/get-quotation?service=${serviceData.slug}`} className="btn btn-primary">
                  Request a Quote
                </Link>
                <Link href={`/portfolio?category=${serviceData.slug}`} className="btn btn-outline">
                  View Related Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
