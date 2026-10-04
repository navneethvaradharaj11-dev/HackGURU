'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { organizerNavItems } from '@/lib/constants';
import Avatar from '@/components/ui/Avatar';

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
  events: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  create: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>,
  analytics: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  ai: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a4 4 0 014 4v1a1 1 0 001 1h1a4 4 0 010 8h-1a1 1 0 00-1 1v1a4 4 0 01-8 0v-1a1 1 0 00-1-1H6a4 4 0 010-8h1a1 1 0 001-1V6a4 4 0 014-4z"/></svg>,
};

export default function OrganizerSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/organizer') return pathname === '/organizer';
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-full lg:w-64 bg-white border border-gray-200 rounded-lg p-4 shadow-sm shrink-0 h-fit">
      {/* Organizer info */}
      <div className="flex items-center gap-3 px-3 py-3 mb-4 rounded-lg bg-gray-50 border border-gray-100">
        <Avatar name="Priya Venkatesh" size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-900 truncate">Priya Venkatesh</p>
          <p className="text-[11px] text-gray-500 truncate">FutureTech Labs</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="space-y-1">
        {organizerNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors',
              isActive(item.href)
                ? 'text-violet-700 bg-violet-50 font-semibold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            <span className={cn('shrink-0', isActive(item.href) ? 'text-violet-600' : 'text-gray-400')}>
              {item.icon && iconMap[item.icon]}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Switch to Student view */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Switch to Student View
        </Link>
      </div>
    </aside>
  );
}
