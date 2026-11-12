'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Globe, ArrowUpRight, Sparkles, Rss } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF9F6] border-t border-neutral-200/80 text-neutral-600 mt-20 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand & Editorial Bio (Image 6 style) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0B0B0E] text-white shadow-sm hover:opacity-95 transition-opacity">
              <span className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-[11px] font-black text-white">
                A
              </span>
              <span className="font-bold text-sm tracking-tight text-white">
                AllCollegeEvent<span className="text-violet-400">.com</span>
              </span>
            </Link>

            <p className="text-[13px] text-neutral-500 leading-relaxed max-w-sm font-normal">
              A calm, magazine-grade student opportunity network for collegiate builders across India. Verified hackathons, technical symposiums, research fellowships, and cultural fests calmly engineered in one settled-time ledger.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-700 text-xs font-semibold border border-neutral-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified Student Network
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-neutral-600 text-xs font-medium border border-neutral-200/80 shadow-xs">
                <Sparkles size={12} className="text-violet-600" />
                AI Match v2.4 Active
              </span>
            </div>
          </div>

          {/* Product Tracks */}
          <div>
            <h4 className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider mb-4">
              PRODUCT
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/events?category=hackathon" className="text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center gap-1">
                  National Hackathons
                </Link>
              </li>
              <li>
                <Link href="/events?category=symposium" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Tech Symposiums
                </Link>
              </li>
              <li>
                <Link href="/events?category=workshop" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Hands-on Masterclasses
                </Link>
              </li>
              <li>
                <Link href="/events?category=competition" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Robowars & Coding Cups
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="text-violet-600 font-semibold hover:text-violet-700 transition-colors inline-flex items-center gap-1">
                  AI Match Telemetry <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/system-status" className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live Platform Status
                </Link>
              </li>
              <li>
                <Link href="/ai-telemetry" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  AI Semantic Engine
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  National Campus Calendar
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  College Directory
                </Link>
              </li>
              <li>
                <Link href="/organizer" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Organizer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/profile" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  About AllCollegeEvent
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Student Ledger Terms
                </Link>
              </li>
              <li>
                <a href="mailto:contact@allcollegeevent.com" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Campus Support
                </a>
              </li>
              <li>
                <Link href="/organizer/events/create" className="text-violet-600 font-semibold hover:text-violet-700 transition-colors">
                  Host Campus Event
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar (Image 6 style) */}
        <div className="mt-12 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} AllCollegeEvent.com Student Opportunity Network. Built for 50,000+ collegiate builders.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Globe size={13} /> India Network</span>
            <span>·</span>
            <span>settled-time ledger v2.6</span>
            <span>·</span>
            <Rss size={13} className="text-neutral-400 hover:text-neutral-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
