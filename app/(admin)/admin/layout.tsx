import * as React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#080808] text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}
