import * as React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/client';
import { EditPortfolioForm } from '@/components/admin/EditPortfolioForm';

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Edit Project</h1>
        <p className="text-[var(--text-muted)]">Update details for {project.title}</p>
      </div>

      <EditPortfolioForm project={project} />
    </div>
  );
}
