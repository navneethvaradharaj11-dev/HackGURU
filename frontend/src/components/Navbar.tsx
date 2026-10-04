'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { notificationApi } from '@/lib/api';
import {
  Trophy,
  Sparkles,
  Compass,
  Calendar,
  LayoutDashboard,
  Bell,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  Search,
  Menu,
  X,
  Bookmark,
  Building,
  Briefcase
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, logout } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topSearch, setTopSearch] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (token) {
      notificationApi.getNotifications()
        .then((res) => {
          if (Array.isArray(res.data)) setNotifications(res.data);
        })
        .catch(() => {
          setNotifications([
            { id: '1', title: 'New Match Found', message: 'IIT Bombay TechFest Hackathon is a 98% match', read: false, createdAt: '5m ago' },
            { id: '2', title: 'Registration Deadline', message: 'Smart India Hackathon closes in 2 days', read: false, createdAt: '1h ago' },
          ]);
        });
    }
  }, [token]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topSearch.trim()) {
      router.push(`/events?search=${encodeURIComponent(topSearch.trim())}`);
    } else {
      router.push('/events');
    }
  };

  const navItems = [
    { name: 'Events', href: '/events', icon: Compass },
    { name: 'AI Matches', href: '/recommendations', icon: Sparkles },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;
  const initials = user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'ST';

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

        {/* Left: Brand Logo + Embedded Search (LinkedIn style) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-2xs group-hover:bg-violet-700 transition-colors">
              <Trophy className="w-4 h-4 text-amber-300 fill-amber-300" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base tracking-tight text-gray-900 leading-none block">
                AllCollegeEvent<span className="text-violet-600">.com</span>
              </span>
            </div>
          </Link>

          {/* LinkedIn-style Top Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:block">
            <div className="relative w-64 lg:w-72">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search events, colleges..."
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200/70 focus:bg-white text-xs text-gray-900 placeholder-gray-500 border border-transparent focus:border-violet-600 focus:outline-none transition-all"
              />
            </div>
          </form>
        </div>

        {/* Center Nav — Desktop (LinkedIn tab style) */}
        <nav className="hidden md:flex items-center gap-1 h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center px-4 h-full text-[11px] font-medium transition-all border-b-2 ${
                  active
                    ? 'border-violet-600 text-gray-900 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${active ? 'text-violet-600' : 'text-gray-500'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {token && (
            <Link
              href="/dashboard"
              className={`flex flex-col items-center justify-center px-4 h-full text-[11px] font-medium transition-all border-b-2 ${
                isActive('/dashboard')
                  ? 'border-violet-600 text-gray-900 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 mb-0.5 ${isActive('/dashboard') ? 'text-violet-600' : 'text-gray-500'}`} />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Post an Event / Organizer Portal */}
          <Link
            href="/organizer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-violet-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Building className="w-3.5 h-3.5" />
            <span>Post Event</span>
          </Link>

          {/* Notifications */}
          {token && (
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-gray-200 shadow-lg z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                    <h4 className="text-xs font-bold text-gray-900">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-[11px] font-medium text-violet-600">{unreadCount} new</span>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 text-xs">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`px-4 py-2.5 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-violet-50/40' : ''}`}
                      >
                        <p className="font-semibold text-gray-800">{n.title}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{n.message}</p>
                        <span className="text-[10px] text-violet-600 font-medium mt-1 block">{n.createdAt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Section (LinkedIn Profile style) */}
          {user ? (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="User menu"
              >
                <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center font-bold text-xs text-white select-none">
                  {initials}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-xs font-medium text-gray-800 max-w-[80px] truncate">
                    {user.fullName?.split(' ')[0] || 'Me'}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900">{user.fullName}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    {user.collegeName && (
                      <p className="text-[10px] text-violet-600 font-medium mt-0.5">{user.collegeName}</p>
                    )}
                  </div>
                  <div className="p-1 text-xs">
                    <Link href="/dashboard" onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-700 rounded-md transition-colors">
                      <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                    </Link>
                    <Link href="/calendar" onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-700 rounded-md transition-colors">
                      <Calendar className="w-3.5 h-3.5" /> Calendar &amp; Deadlines
                    </Link>
                    <Link href="/organizer" onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-700 rounded-md transition-colors">
                      <Building className="w-3.5 h-3.5" /> Organizer Workspace
                    </Link>
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-md bg-violet-600 hover:bg-violet-700 text-xs font-semibold text-white transition-colors shadow-2xs"
              >
                Join Now
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1 text-xs">
            {/* Search in mobile */}
            <form onSubmit={handleSearchSubmit} className="mb-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={topSearch}
                  onChange={(e) => setTopSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-md bg-gray-100 text-xs text-gray-900 border border-transparent focus:bg-white focus:border-violet-600 focus:outline-none"
                />
              </div>
            </form>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
                    active ? 'bg-violet-50 text-violet-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-violet-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
            
            <Link
              href="/organizer"
              className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-50"
            >
              <Building className="w-4 h-4 text-gray-400" />
              Post an Event
            </Link>

            {token && (
              <Link href="/dashboard"
                className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('/dashboard') ? 'bg-violet-50 text-violet-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            )}

            {!user && (
              <div className="pt-2 flex flex-col gap-2">
                <Link href="/login" className="w-full text-center py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="w-full text-center py-2 text-xs font-semibold text-white bg-violet-600 rounded-md hover:bg-violet-700 transition-colors">
                  Join Now
                </Link>
              </div>
            )}
            
            {user && (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors mt-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
