import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { getAllSuppliers } from '@/lib/db/queries/suppliers';
import { AddSupplierModal, DeleteSupplierModal } from '@/components/admin/SupplierModals';

export default async function AdminSuppliersPage() {
  const suppliers = await getAllSuppliers();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Suppliers & Partners</h1>
          <p className="text-[var(--text-muted)]">Manage your trusted materials and service partners</p>
        </div>
        <AddSupplierModal />
      </div>

      <div className="bg-[var(--bg-surface-2)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-surface-1)] border-b border-[var(--border)] text-[var(--text-muted)] text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Logo & Name</th>
                <th className="p-4 font-medium">Website</th>
                <th className="p-4 font-medium">Display Order</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-secondary)]">
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-[var(--text-muted)]">
                    No suppliers found. Add one to get started!
                  </td>
                </tr>
              ) : (
                suppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-[var(--bg-surface-1)]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative bg-white rounded flex-shrink-0 flex items-center justify-center p-1 border border-[var(--border)] overflow-hidden">
                          {s.logoUrl ? (
                            <Image src={s.logoUrl} alt={s.name} fill className="object-contain" />
                          ) : (
                            <span className="text-[10px] text-gray-400">No Logo</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">{s.name}</div>
                          <div className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1 max-w-xs">{s.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {s.website ? (
                        <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                          {s.website.replace(/^https?:\/\//, '')}
                        </a>
                      ) : (
                        <span className="text-[var(--text-muted)]">-</span>
                      )}
                    </td>
                    <td className="p-4">{s.order}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/suppliers/${s.id}/edit`} className="p-2 hover:bg-[var(--bg-surface-1)] rounded transition-colors text-[var(--text-muted)] hover:text-white">
                          <Pencil size={16} />
                        </Link>
                        <DeleteSupplierModal supplierId={s.id} />
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
