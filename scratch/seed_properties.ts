import { prisma } from '../lib/db/client';

async function main() {
  const dummyProperties = [
    {
      title: "1 Kanal Luxury Modern House",
      slug: "1-kanal-luxury-modern-house-dha-phase-6",
      status: "for-sale",
      type: "house",
      price: "5.5 Crore",
      priceNumeric: 55000000,
      location: "DHA Phase 6, Lahore",
      marla: 20,
      areaSqft: 4500,
      beds: 5,
      baths: 6,
      description: "A stunning ultra-modern 1 Kanal house featuring state-of-the-art architecture, imported fixtures, Italian kitchen, and a beautiful swimming pool. Designed by top architects with premium finishes throughout.",
      features: ["Swimming Pool", "Imported Kitchen", "Servant Quarter", "Home Theater", "Double Height Lobby"],
      coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
      featured: true
    },
    {
      title: "10 Marla Spanish Villa",
      slug: "10-marla-spanish-villa-bahria-town",
      status: "for-sale",
      type: "house",
      price: "3.2 Crore",
      priceNumeric: 32000000,
      location: "Bahria Town, Lahore",
      marla: 10,
      areaSqft: 2250,
      beds: 4,
      baths: 4,
      description: "Elegant Spanish styled villa offering luxurious living space. Complete with solid wood doors, grand chandeliers, and premium tile flooring.",
      features: ["Solid Wood Doors", "Chandelier", "Jacuzzi", "Landscaped Garden", "Security System"],
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      featured: true
    },
    {
      title: "Premium Commercial Plaza",
      slug: "premium-commercial-plaza-gulberg",
      status: "for-rent",
      type: "commercial",
      price: "8 Lakh/month",
      priceNumeric: 800000,
      location: "Gulberg III, Lahore",
      marla: 8,
      areaSqft: 3600,
      description: "Prime location commercial plaza suitable for multi-national companies and large retail brands. High foot traffic and dedicated parking spaces.",
      features: ["Dedicated Parking", "Central AC", "Elevator", "Backup Generator", "Main Boulevard Facing"],
      coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
      featured: false
    }
  ];

  for (const property of dummyProperties) {
    // Upsert to prevent unique constraint errors if run multiple times
    await prisma.property.upsert({
      where: { slug: property.slug },
      update: {},
      create: property
    });
  }

  console.log('Dummy properties added successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
