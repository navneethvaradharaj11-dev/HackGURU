'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Trophy, Search, Bell, Menu, X, LogOut, LayoutDashboard, CheckCheck, PlusCircle, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const mockNotifications = [
  { id: '1', type: 'deadline', title: 'Registration closes soon', message: 'HackForge 2026: 36-Hr National Hackathon', read: false, link: '/events/hackforge-2026' },
  { id: '2', type: 'symposium', title: 'New Symposium Added', message: 'INNOFEST 2026 - IIT Madras', read: false, link: '/events/innofest-2026' },
  { id: '3', type: 'fest', title: 'Cultural Fest Live', message: 'RHYTHM 2026 - VIT Vellore Pro-Nite Passes', read: false, link: '/events/rhythm-2026' },
];

const navLinks = [
  { label: 'Explore', href: '/events' },
  { label: 'Hackathons', href: '/events?category=Hackathon' },
  { label: 'Symposiums', href: '/events?category=Symposium' },
  { label: 'Workshops', href: '/events?category=Workshop' },
  { label: 'Robotics', href: '/events?category=Competition' },
  { label: 'Directory', href: '/explore' },
];

const cities = ['All India', 'Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi NCR', 'Online'];

function NavbarContent({ onOpenPostModal }: { onOpenPostModal?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('All India');
  const notifRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();

  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const [path, query] = href.split('?');
    if (query) {
      const qParams = new URLSearchParams(query);
      const catParam = qParams.get('category');
      if (catParam) {
        return pathname === path && searchParams?.get('category')?.toLowerCase() === catParam.toLowerCase();
      }
      return pathname === path && searchParams?.toString() === query;
    }
    if (href === '/events') {
      return pathname === '/events' && !searchParams?.get('category') && !searchParams?.get('search');
    }
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="h-16 px-4 sm:px-6 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between gap-4 transition-all">
          
          {/* Brand Pill (AllCollegeEvent.com) */}
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0B0B0E] text-white shadow-xs hover:opacity-90 transition-opacity">
              <span className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-[10px] font-black text-white">
                A
              </span>
              <span className="font-bold text-[13.5px] tracking-tight text-white leading-none">
                AllCollegeEvent<span className="text-violet-400">.com</span>
              </span>
            </Link>

            {/* Region Selector Pill */}
            <div ref={cityRef} className="relative hidden lg:block">
              <button
                onClick={() => setCityOpen(!cityOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100/80 hover:bg-neutral-200/60 border border-neutral-200/60 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
              >
                <MapPin size={12} className="text-violet-600" />
                <span>{selectedCity}</span>
              </button>
              {cityOpen && (
                <div className="absolute top-full mt-2 left-0 w-44 bg-white border border-neutral-200/80 rounded-2xl shadow-xl py-1.5 z-50">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityOpen(false);
                        if (city === 'All India') {
                          router.push('/events');
                        } else {
                          router.push(`/events?location=${encodeURIComponent(city)}`);
                        }
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium cursor-pointer transition-colors ${selectedCity === city ? 'bg-violet-50 text-violet-700 font-bold' : 'text-neutral-700 hover:bg-neutral-50'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[13px] font-medium px-3 py-1.5 rounded-full transition-all ${
                    active 
                      ? 'bg-neutral-100 text-neutral-900 font-semibold' 
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            
            {/* Quick Search */}
            <Link href="/events" className="hidden sm:inline-flex w-9 h-9 rounded-full border border-neutral-200/80 bg-white items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors">
              <Search size={15} />
            </Link>

            {/* Notification Dropdown */}
            <div ref={notifRef} className="relative">
              <button
                aria-label="Notifications"
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-9 h-9 rounded-full border border-neutral-200/80 bg-white flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer relative"
              >
                <Bell size={15} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-violet-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-neutral-200/90 rounded-2xl shadow-xl overflow-hidden z-50">
                  <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-100">
                    <span className="font-bold text-xs text-neutral-900">Campus Alerts</span>
                    <button onClick={handleMarkAll} className="text-violet-600 text-[11px] font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                      <CheckCheck size={13} /> Mark read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-neutral-50">
                    {notifications.map(n => (
                      <Link
                        key={n.id}
                        href={n.link || '/events'}
                        onClick={() => setNotifOpen(false)}
                        className={`block px-4 py-3 text-left transition-colors ${n.read ? 'hover:bg-neutral-50' : 'bg-violet-50/50 hover:bg-violet-50'}`}
                      >
                        <p className="text-xs font-semibold text-neutral-900">{n.title}</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{n.message}</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/notifications"
                    onClick={() => setNotifOpen(false)}
                    className="block py-2 text-center text-xs font-semibold text-violet-600 hover:bg-neutral-50 border-t border-neutral-100"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Auth / Post Actions */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-50">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:inline-flex text-xs font-semibold text-neutral-700 px-3.5 py-2 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/organizer/events/create"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  <span>Post event</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-3xl shadow-xl flex flex-col gap-3">
            <div className="pb-2 border-b border-neutral-100">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">Campus Region</span>
              <div className="flex flex-wrap gap-1.5">
                {cities.slice(0, 5).map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      setSelectedCity(c);
                      setMobileOpen(false);
                      if (c === 'All India') {
                        router.push('/events');
                      } else {
                        router.push(`/events?location=${encodeURIComponent(c)}`);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedCity === c ? 'bg-violet-600 text-white' : 'bg-neutral-100 text-neutral-700'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm py-2 px-3 rounded-xl font-medium ${isActive(link.href) ? 'bg-violet-50 text-violet-700 font-bold' : 'text-neutral-700 hover:bg-neutral-50'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-100 flex gap-2">
              <Link
                href="/organizer/events/create"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-violet-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1"
              >
                Post Event <ArrowUpRight size={13} />
              </Link>
              {!user && (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-neutral-200 text-neutral-700 text-xs font-bold text-center"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export function Navbar(props: { onOpenPostModal?: () => void }) {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="h-16 px-4 sm:px-6 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between gap-4" />
        </div>
      </header>
    }>
      <NavbarContent {...props} />
    </Suspense>
  );
}

export default Navbar;
