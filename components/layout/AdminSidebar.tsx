'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Quote, Users, Settings, LogOut, MessageSquare, Building2, Mail } from 'lucide-react';
import { signOut } from 'next-auth/react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/quotations', label: 'Quotations', icon: MessageSquare },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/portfolio', label: 'Portfolio', icon: FileText },
  { href: '/admin/properties', label: 'Properties', icon: Building2 },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/admin/suppliers', label: 'Suppliers', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#111] border-r border-[#333] h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-[#333]">
        <Link href="/">
          <Image src="/logo.png" alt="Saibaan Construction" width={88} height={88} quality={100} className="rounded-full object-cover" />
        </Link>
        <div className="mt-4 text-xs font-bold text-[var(--gold)] tracking-widest uppercase">Admin Panel</div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-[var(--gold-subtle)] text-[var(--gold)] border border-[var(--gold-border)]'
                  : 'text-[#888] hover:bg-[#222] hover:text-white border border-transparent'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#333]">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 w-full px-4 py-3 text-[#888] hover:text-[#e55b5b] hover:bg-[#e55b5b]/10 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
