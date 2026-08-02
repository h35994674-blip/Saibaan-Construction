import * as React from 'react';
import { prisma } from '@/lib/db/client';
import { formatDate } from '@/lib/utils/formatting';
import { changeQuotationStatus } from '@/lib/actions/admin';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Maximize, Target } from 'lucide-react';

export default async function QuotationsAdminPage() {
  const quotations = await prisma.quotationRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Quotation Requests</h1>
          <p className="text-[#888]">Manage and respond to client inquiries.</p>
        </div>
      </div>

      <div className="space-y-6">
        {quotations.map((quote) => (
          <div key={quote.id} className="bg-[#111] border border-[#333] rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6 pb-6 border-b border-[#333]">
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-xl font-bold text-white">{quote.name}</h3>
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium capitalize ${
                      quote.status === 'new' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                      quote.status === 'reviewing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                      'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    }`}>
                      {quote.status}
                    </span>
                  <span className="text-sm text-[#888] ml-auto">{formatDate(quote.createdAt)}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div className="flex items-center gap-2 text-[#ccc]">
                    <Phone size={14} className="text-[#888]" /> {quote.phone}
                  </div>
                  {quote.email && (
                    <div className="flex items-center gap-2 text-[#ccc]">
                      <Mail size={14} className="text-[#888]" /> {quote.email}
                    </div>
                  )}
                  {quote.location && (
                    <div className="flex items-center gap-2 text-[#ccc]">
                      <MapPin size={14} className="text-[#888]" /> {quote.location}
                    </div>
                  )}
                  {quote.areaSqft && (
                    <div className="flex items-center gap-2 text-[#ccc]">
                      <Maximize size={14} className="text-[#888]" /> {quote.areaSqft} Sq.Ft.
                    </div>
                  )}
                  {quote.budgetRange && (
                    <div className="flex items-center gap-2 text-[#ccc] col-span-1 sm:col-span-2">
                      <span className="text-[#888]">Budget:</span> <span className="font-medium text-[var(--gold)]">{quote.budgetRange}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                <form action={async () => {
                  'use server';
                  await changeQuotationStatus(quote.id, 'new');
                }}>
                  <Button type="submit" variant="ghost" size="sm" className="w-full justify-start text-[#888] hover:text-white" disabled={quote.status === 'new'}>Mark as New</Button>
                </form>
                <form action={async () => {
                  'use server';
                  await changeQuotationStatus(quote.id, 'reviewing');
                }}>
                  <Button type="submit" variant="ghost" size="sm" className="w-full justify-start text-[#888] hover:text-white" disabled={quote.status === 'reviewing'}>Mark as Reviewing</Button>
                </form>
                <form action={async () => {
                  'use server';
                  await changeQuotationStatus(quote.id, 'responded');
                }}>
                  <Button type="submit" variant="ghost" size="sm" className="w-full justify-start text-[#888] hover:text-white" disabled={quote.status === 'responded'}>Mark as Responded</Button>
                </form>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[#888] flex items-center gap-2 mb-2">
                  <Target size={14} /> Requested Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  {quote.services.map(s => (
                    <span key={s} className="px-3 py-1 bg-[#222] border border-[#333] rounded-full text-xs text-[#ccc] capitalize">
                      {s.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {quote.message && (
                <div>
                  <h4 className="text-sm font-semibold text-[#888] mb-2">Additional Message</h4>
                  <p className="text-sm text-[#ccc] bg-[#1a1a1a] p-4 rounded-lg whitespace-pre-wrap border border-[#222]">
                    {quote.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {quotations.length === 0 && (
          <div className="text-center py-20 bg-[#111] border border-[#333] rounded-2xl">
            <h3 className="text-xl font-heading text-white mb-2">No quotation requests yet.</h3>
            <p className="text-[#888]">New requests will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
