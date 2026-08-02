import * as React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/client';
import { EditPropertyForm } from '@/components/admin/EditPropertyForm';

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Edit Property</h1>
        <p className="text-[var(--text-muted)]">Update details for {property.title}</p>
      </div>

      <EditPropertyForm property={property} />
    </div>
  );
}
