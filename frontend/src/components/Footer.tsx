'use client';

import React from 'react';
import Link from 'next/link';
import { Trophy, ShieldCheck, Mail, Globe, Share2 } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 mt-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-300 fill-amber-300" />
              </div>
              <div>
                <span className="font-bold text-base text-gray-900 tracking-tight leading-none block">
                  AllCollegeEvent<span className="text-violet-600">.com</span>
                </span>
                <span className="text-[11px] text-gray-500">Student Opportunity Network</span>
              </div>
            </Link>

            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              Discover hackathons, technical workshops, internships, and student competitions from colleges across India. Powered by intelligent matching.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                <ShieldCheck className="w-3 h-3" /> Verified Student Network
              </span>
            </div>
          </div>

          {/* Opportunities */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Opportunities</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/events?category=hackathon" className="hover:text-violet-600 transition-colors">Hackathons</Link></li>
              <li><Link href="/events?category=workshop" className="hover:text-violet-600 transition-colors">Workshops</Link></li>
              <li><Link href="/events?category=internship" className="hover:text-violet-600 transition-colors">Internships</Link></li>
              <li><Link href="/events?category=competition" className="hover:text-violet-600 transition-colors">Competitions</Link></li>
              <li><Link href="/recommendations" className="hover:text-violet-600 transition-colors">AI Matches</Link></li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Community</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-violet-600 transition-colors">Student Dashboard</Link></li>
              <li><Link href="/calendar" className="hover:text-violet-600 transition-colors">Event Calendar</Link></li>
              <li><Link href="/organizer" className="hover:text-violet-600 transition-colors">Post an Event</Link></li>
              <li><Link href="/explore" className="hover:text-violet-600 transition-colors">Directory</Link></li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-violet-600 transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-violet-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-violet-600 transition-colors">Terms of Service</Link></li>
              <li><a href="mailto:contact@allcollegeevent.com" className="hover:text-violet-600 transition-colors">Help Center</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} AllCollegeEvent.com. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> India</span>
            <span>·</span>
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
