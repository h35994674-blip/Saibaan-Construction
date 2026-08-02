import * as React from 'react';
import { generateMetadata as getSeoMetadata } from '@/lib/utils/seo';
import { FurnishingClient } from './FurnishingClient';

export const metadata = getSeoMetadata({
  title: 'Furnishing Services',
  description: 'Curated furnishing services bringing elegance and comfort to every room with premium furniture and décor in Peshawar.',
});

export default function FurnishingPage() {
  return <FurnishingClient />;
}
