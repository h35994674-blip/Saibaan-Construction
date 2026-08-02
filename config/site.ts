// Site-wide configuration
export const siteConfig = {
  name: 'Saiban Construction',
  tagline: 'Building Dreams, Crafting Excellence',
  description:
    'Saiban Construction offers premium architecture, interior design, finishing, grey structure, renovation, furnishing, and landscaping services across Pakistan.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saibaanconstruction.com',
  ogImage: '/og-image.jpg',
  email: 'contact@saibaanconstruction.com',
  phone: '+92 300 0000000',
  address: 'Peshawar, Khyber Pakhtunkhwa, Pakistan',
  socials: {
    facebook: 'https://facebook.com/saibaanconstruction',
    instagram: 'https://instagram.com/saibaanconstruction',
    whatsapp: 'https://wa.me/923000000000',
  },
  services: [
    {
      slug: 'architecture',
      title: 'Architecture Services',
      shortTitle: 'Architecture',
      description:
        'Innovative architectural design blending functionality with aesthetic brilliance for residential and commercial projects.',
      icon: 'Building2',
      color: '#C9A84C',
    },
    {
      slug: 'interior-design',
      title: 'Interior Design',
      shortTitle: 'Interior Design',
      description:
        'Transforming spaces into inspiring environments with bespoke interior design solutions tailored to your lifestyle.',
      icon: 'Sofa',
      color: '#C9A84C',
    },
    {
      slug: 'finishing',
      title: 'Finishing',
      shortTitle: 'Finishing',
      description:
        'Premium finishing services delivering flawless surfaces, textures, and details that define quality craftsmanship.',
      icon: 'Paintbrush',
      color: '#C9A84C',
    },
    {
      slug: 'grey-structure',
      title: 'Grey Structure',
      shortTitle: 'Grey Structure',
      description:
        'Solid and reliable grey structure construction ensuring structural integrity and durability for every project.',
      icon: 'Hammer',
      color: '#C9A84C',
    },
    {
      slug: 'renovation',
      title: 'Renovation',
      shortTitle: 'Renovation',
      description:
        'Complete renovation solutions that breathe new life into existing spaces with modern design and quality execution.',
      icon: 'Wrench',
      color: '#C9A84C',
    },
    {
      slug: 'furnishing',
      title: 'Furnishing',
      shortTitle: 'Furnishing',
      description:
        'Curated furnishing services bringing elegance and comfort to every room with premium furniture and décor.',
      icon: 'Armchair',
      color: '#C9A84C',
    },
    {
      slug: 'landscaping',
      title: 'Landscape',
      shortTitle: 'Landscape',
      description:
        'Beautiful outdoor landscaping design creating serene, functional, and visually stunning garden and outdoor spaces.',
      icon: 'Trees',
      color: '#C9A84C',
    },
  ],
  stats: [
    { value: 150, suffix: '+', label: 'Projects Completed' },
    { value: 10, suffix: '+', label: 'Years of Experience' },
    { value: 200, suffix: '+', label: 'Happy Clients' },
    { value: 5, suffix: '', label: 'Cities Covered' },
  ],
};

export type Service = (typeof siteConfig.services)[0];
