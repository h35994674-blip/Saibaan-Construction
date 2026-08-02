import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllSuppliers } from '@/lib/db/queries/suppliers';

export async function SuppliersStrip() {
  const suppliers = await getAllSuppliers();

  if (!suppliers.length) return null;

  return (
    <section className="py-12 bg-[var(--bg-base)] border-y border-[var(--border)] overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-widest">
            Trusted by premium brands & suppliers
          </p>
          <Link href="/about/suppliers" className="text-sm text-gold hover:underline font-medium">
            View All Suppliers
          </Link>
        </div>
        
        {/* Simple flex layout for logos */}
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {suppliers.slice(0, 6).map((supplier) => (
            <div key={supplier.id} className="relative h-12 w-32 flex items-center justify-center">
              {supplier.logoUrl ? (
                <Image
                  src={supplier.logoUrl}
                  alt={supplier.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <span className="font-heading font-bold text-xl text-white">{supplier.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
