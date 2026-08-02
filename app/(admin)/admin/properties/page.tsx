import * as React from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getAllProperties } from '@/lib/db/queries/properties';
import { formatCurrency } from '@/lib/utils/formatting';
import { Badge } from '@/components/ui/Badge';
import { AddPropertyModal, DeletePropertyModal } from '@/components/admin/PropertyModals';

export default async function AdminPropertiesPage() {
  const properties = await getAllProperties();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Properties</h1>
          <p className="text-[var(--text-muted)]">Manage real estate listings</p>
        </div>
        <AddPropertyModal />
      </div>

      <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-surface-1)] border-b border-[var(--border)] text-[var(--text-muted)] text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-secondary)]">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[var(--text-muted)]">
                    No properties found. Add one to get started!
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.id} className="hover:bg-[var(--bg-surface-1)]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-white">{property.title}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-1">{property.location}</div>
                    </td>
                    <td className="p-4 capitalize">{property.type}</td>
                    <td className="p-4">
                      <Badge variant={property.status === 'for-sale' || property.status === 'for-rent' ? 'gold' : 'outline'}>
                        {property.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4 font-medium text-gold">{property.price || 'N/A'}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/properties/${property.id}/edit`} className="p-2 hover:bg-[var(--bg-surface-1)] rounded transition-colors text-[var(--text-muted)] hover:text-white">
                          <Pencil size={16} />
                        </Link>
                        <DeletePropertyModal propertyId={property.id} />
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
