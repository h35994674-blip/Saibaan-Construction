import * as React from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getAllProjects } from '@/lib/db/queries/projects';
import { Badge } from '@/components/ui/Badge';
import { AddPortfolioModal, DeletePortfolioModal } from '@/components/admin/PortfolioModals';

export default async function AdminPortfolioPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Portfolio</h1>
          <p className="text-[var(--text-muted)]">Manage your construction and design projects</p>
        </div>
        <AddPortfolioModal />
      </div>

      <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-surface-1)] border-b border-[var(--border)] text-[var(--text-muted)] text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-secondary)]">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--text-muted)]">
                    No projects found. Add one to get started!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-[var(--bg-surface-1)]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-white">{project.title}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-1">{project.location || 'No location'}</div>
                    </td>
                    <td className="p-4 capitalize">{project.category.replace('-', ' ')}</td>
                    <td className="p-4">
                      <Badge variant={project.status === 'completed' ? 'gold' : 'muted'}>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/portfolio/${project.id}/edit`} className="p-2 hover:bg-[var(--bg-surface-1)] rounded transition-colors text-[var(--text-muted)] hover:text-white">
                          <Pencil size={16} />
                        </Link>
                        <DeletePortfolioModal projectId={project.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
