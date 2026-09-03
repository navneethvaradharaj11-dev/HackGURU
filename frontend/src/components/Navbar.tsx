'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { notificationApi } from '@/lib/api';
import {
  Sparkles,
  Compass,
  Calendar,
  Activity,
  LayoutDashboard,
  Bell,
  User,
  LogOut,
  LogIn,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const { user, token, logout } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (token) {
      notificationApi.getNotifications()
        .then((res) => {
          if (Array.isArray(res.data)) {
            setNotifications(res.data);
          }
        })
        .catch(() => {
          // Fallback mock notifications if backend endpoint returns default structure
          setNotifications([
            { id: '1', title: 'New Recommendation', message: 'HackGURU AI matched you with IIT TechFest 2026', read: false, createdAt: '10m ago' },
            { id: '2', title: 'Deadline Reminder', message: 'Smart India Hackathon registration closes in 2 days', read: false, createdAt: '1h ago' },
          ]);
        });
    }
  }, [token]);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Feed', href: '/recommendations', icon: Sparkles },
    { name: 'Events', href: '/events', icon: Compass },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'AI Telemetry', href: '/ai-telemetry', icon: Cpu },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              AllCollegeEvent<span className="text-blue-400 font-bold">.AI</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase block -mt-1">
              HackGuru AI Engine
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Auth & Notifications */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Dropdown */}
          {token && (
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifs && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-400" /> Notifications
                    </h4>
                    <span className="text-xs text-gray-400">{notifications.length} alerts</span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-4">No notifications</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <p className="text-xs font-semibold text-gray-200">{n.title}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{n.message}</p>
                          <span className="text-[9px] text-blue-400 mt-1 block">{n.createdAt}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Profile / Login Button */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1.5 pl-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white">
                  {user.fullName ? user.fullName[0].toUpperCase() : 'S'}
                </div>
                <span className="text-xs font-medium text-gray-200 hidden sm:inline">{user.fullName || 'Student'}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl glass-panel border border-white/10 shadow-2xl p-3 z-50">
                  <div className="p-3 border-b border-white/10 mb-2">
                    <p className="text-xs font-bold text-white">{user.fullName}</p>
                    <p className="text-[11px] text-blue-400 truncate">{user.collegeName || user.email}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{user.careerGoal || 'AI Explorer'}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-2 text-xs font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="glow-button px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" /> Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
