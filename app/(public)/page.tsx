import { HeroSection } from '@/components/sections/home/HeroSection';
import { StatsSection } from '@/components/sections/home/StatsSection';
import { AccreditationsStrip } from '@/components/sections/home/AccreditationsStrip';
import { ServicesSection } from '@/components/sections/home/ServicesSection';
import { FeaturedPortfolio } from '@/components/sections/home/FeaturedPortfolio';
import { WhyChooseUs } from '@/components/sections/home/WhyChooseUs';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTABanner } from '@/components/sections/home/CTABanner';
import { SuppliersStrip } from '@/components/sections/home/SuppliersStrip';

export const revalidate = 60;

async function getTestimonials() {
  try {
    const { getFeaturedTestimonials } = await import('@/lib/db/queries/testimonials');
    return await getFeaturedTestimonials();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedPortfolio />
      <WhyChooseUs />
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}
      <SuppliersStrip />
      <AccreditationsStrip />
      <CTABanner />
    </>
  );
}
