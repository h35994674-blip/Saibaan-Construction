import { prisma } from '../lib/db/client';

async function main() {
  const testimonials = [
    // ── Written Reviews ────────────────────────────────────────────────
    {
      clientName: 'Ahmed Raza',
      projectType: 'Luxury Villa Construction',
      feedback: 'Saiban Construction turned our dream home into a reality. Their attention to detail and commitment to quality is unmatched. The grey structure and finishing were absolutely flawless.',
      rating: 5,
      photoUrl: null,
      videoUrl: null,
      featured: true,
    },
    {
      clientName: 'Sana Mirza',
      projectType: 'Bespoke Interior Design',
      feedback: 'We hired Saiban for our entire home interior and they exceeded every expectation. The level of craftsmanship was exceptional. Our guests are always amazed at how beautiful our home looks.',
      rating: 5,
      photoUrl: null,
      videoUrl: null,
      featured: true,
    },
    {
      clientName: 'Usman Tariq',
      projectType: 'Full House Renovation',
      feedback: 'Renovating an old house is always stressful, but Saiban made it completely seamless. They delivered on time and within budget without compromising on aesthetics. Highly recommended.',
      rating: 5,
      photoUrl: null,
      videoUrl: null,
      featured: true,
    },
    {
      clientName: 'Fatima Ali',
      projectType: 'Commercial Office Interior',
      feedback: 'The interior design team completely transformed our workspace. It is now modern, highly functional, and our employees love working here. An extremely professional and talented team.',
      rating: 5,
      photoUrl: null,
      videoUrl: null,
      featured: true,
    },
    {
      clientName: 'Bilal Hassan',
      projectType: 'Grey Structure',
      feedback: "From foundation to roof, Saiban's grey structure work was rock solid. They used premium materials and their engineers were on-site every single day to ensure quality.",
      rating: 5,
      photoUrl: null,
      videoUrl: null,
      featured: true,
    },

    // ── Video Reviews ──────────────────────────────────────────────────
    {
      clientName: 'Kamran Sheikh',
      projectType: '1 Kanal House Build',
      feedback: 'Watch my full video review of Saiban Construction. They built our 1 Kanal house from scratch and the results are breathtaking.',
      rating: 5,
      photoUrl: null,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      featured: true,
    },
    {
      clientName: 'Nadia Khan',
      projectType: 'Luxury Interior Design',
      feedback: 'I recorded a full walkthrough of our newly designed home by Saiban. Every room is a masterpiece.',
      rating: 5,
      photoUrl: null,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      featured: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  console.log(`✅ ${testimonials.length} testimonials seeded successfully!`);
  console.log(`   - ${testimonials.filter(t => !t.videoUrl).length} written reviews`);
  console.log(`   - ${testimonials.filter(t => t.videoUrl).length} video reviews`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
