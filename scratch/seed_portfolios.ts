import { prisma } from '../lib/db/client';

async function main() {
  const dummyProjects = [
    {
      title: "Royal Palm Residence",
      slug: "royal-palm-residence-architecture",
      category: "architecture",
      status: "completed",
      location: "DHA Phase 8, Lahore",
      areaSqft: 6500,
      year: 2023,
      description: "A complete architectural design and build of a highly luxurious modern villa, featuring minimalist aesthetics, large glass facades, and a seamless indoor-outdoor connection.",
      services: ["Architecture Design", "Grey Structure", "Premium Finishing", "Landscape"],
      coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
      featured: true
    },
    {
      title: "Gulberg Corporate HQ",
      slug: "gulberg-corporate-hq-interior",
      category: "interior",
      status: "ongoing",
      location: "Gulberg Greens, Islamabad",
      areaSqft: 12000,
      year: 2024,
      description: "Complete interior designing and furnishing of a modern corporate headquarters. Focused on creating an open, collaborative workspace with executive suites and high-end conference rooms.",
      services: ["Space Planning", "Interior Design", "Furnishing", "Smart Lighting"],
      coverImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80",
      featured: true
    },
    {
      title: "Classic Spanish Renovation",
      slug: "classic-spanish-renovation",
      category: "renovation",
      status: "completed",
      location: "Bahria Town, Rawalpindi",
      areaSqft: 4000,
      year: 2022,
      description: "Full-scale renovation of a classic 10-year-old home to restore its original Spanish charm while upgrading all core utilities, flooring, and kitchen to ultra-modern standards.",
      services: ["Demolition", "Renovation", "Plumbing", "Custom Carpentry"],
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      featured: false
    }
  ];

  for (const project of dummyProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project
    });
  }

  console.log('Dummy portfolios added successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
