import * as React from 'react';
import { prisma } from '@/lib/db/client';
import { FileText, MessageSquare, Quote, Users } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/formatting';

export default async function AdminDashboard() {
  // Fetch stats concurrently
  const [projectsCount, quotesCount, recentQuotes, testimonialsCount] = await Promise.all([
    prisma.project.count(),
    prisma.quotationRequest.count({ where: { status: 'new' } }),
    prisma.quotationRequest.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.testimonial.count()
  ]);

  const stats = [
    { title: 'Total Projects', value: projectsCount, icon: FileText, color: 'text-blue-500' },
    { title: 'New Quotations', value: quotesCount, icon: MessageSquare, color: 'text-green-500' },
    { title: 'Testimonials', value: testimonialsCount, icon: Quote, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-[#888]">Welcome back to your admin portal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#111] border border-[#333] p-6 rounded-2xl flex items-center gap-6">
            <div className={`w-14 h-14 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#888] mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Quotations */}
      <div className="bg-[#111] border border-[#333] rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#333] flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-white">Recent Quotation Requests</h2>
          <Link href="/admin/quotations" className="text-sm text-[var(--gold)] hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="px-6 py-4 text-xs font-semibold text-[#888] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#888] uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#888] uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-xs font-semibold text-[#888] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333]">
              {recentQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-[#151515] transition-colors">
                  <td className="px-6 py-4 text-sm text-[#ccc]">{formatDate(quote.createdAt)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{quote.name}</td>
                  <td className="px-6 py-4 text-sm text-[#ccc]">
                    <div className="flex gap-1 flex-wrap">
                      {quote.services.slice(0, 2).map((s) => (
                         <span key={s} className="px-2 py-1 bg-[#222] rounded text-xs">{s.replace('-', ' ')}</span>
                      ))}
                      {quote.services.length > 2 && <span className="px-2 py-1 bg-[#222] rounded text-xs">+{quote.services.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium capitalize ${
                      quote.status === 'new' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                      quote.status === 'reviewing' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                      'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentQuotes.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#888]">No quotation requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
