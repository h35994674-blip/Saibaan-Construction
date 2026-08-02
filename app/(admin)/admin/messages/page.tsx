import * as React from 'react';
import { getAllContactMessages } from '@/lib/db/queries/messages';
import { formatDate } from '@/lib/utils/formatting';
import { Badge } from '@/components/ui/Badge';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Messages | Admin',
};

export default async function MessagesPage() {
  const messages = await getAllContactMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Contact Messages</h1>
        <p className="text-[var(--text-muted)]">View and manage messages sent through the public contact form.</p>
      </div>

      <div className="bg-[var(--bg-surface-1)] rounded-2xl border border-[var(--border)] overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-[var(--text-muted)] flex flex-col items-center">
            <Mail size={48} className="mb-4 opacity-50" />
            <p>No messages received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-surface-2)]">
                  <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
                  <th className="p-4 font-medium text-[var(--text-secondary)]">Sender</th>
                  <th className="p-4 font-medium text-[var(--text-secondary)]">Subject / Message</th>
                  <th className="p-4 font-medium text-[var(--text-secondary)]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 align-top">
                      <Badge variant={msg.status === 'new' ? 'gold' : 'muted'} className="whitespace-nowrap">
                        {msg.status === 'new' ? 'New' : 'Read'}
                      </Badge>
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-medium text-white mb-1">{msg.name}</div>
                      <div className="text-sm text-[var(--text-muted)]">
                        <a href={`mailto:${msg.email}`} className="hover:text-gold transition-colors">{msg.email}</a>
                      </div>
                      {msg.phone && (
                        <div className="text-sm text-[var(--text-muted)]">
                          <a href={`tel:${msg.phone}`} className="hover:text-gold transition-colors">{msg.phone}</a>
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-top max-w-md">
                      {msg.subject && (
                        <div className="font-semibold text-white mb-1">{msg.subject}</div>
                      )}
                      <div className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </td>
                    <td className="p-4 align-top text-sm text-[var(--text-muted)] whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
