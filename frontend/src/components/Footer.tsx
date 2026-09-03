'use client';

import React from 'react';
import { Trophy, Cpu, ShieldCheck, Heart, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 ace-glass mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center border border-white/20">
                <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
              <span className="font-extrabold text-lg text-white">AllCollegeEvent<span className="text-blue-400">.com</span></span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-md">
              India&apos;s #1 AI Event & Hackathon Discovery Platform for College Students. Powered by HackGuru multi-agent AI Gateway (Gemini, OpenAI, Hugging Face).
            </p>
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> AllCollegeEvent Backend Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[11px] font-semibold border border-amber-500/20">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Hackathon AI Engine Active
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">AllCollegeEvent Portal</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="/dashboard" className="hover:text-blue-400 transition-colors">Student Dashboard</a></li>
              <li><a href="/recommendations" className="hover:text-blue-400 transition-colors">AI Opportunity Feed</a></li>
              <li><a href="/events" className="hover:text-blue-400 transition-colors">Event & Hackathon Catalog</a></li>
              <li><a href="/calendar" className="hover:text-blue-400 transition-colors">Calendar & Reminders</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">AI Intelligence Layer</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="/ai-telemetry" className="hover:text-blue-400 transition-colors">AI Gateway & Cost Telemetry</a></li>
              <li><span className="text-gray-400 font-medium">Agent 1: Opportunity Matcher</span></li>
              <li><span className="text-gray-400 font-medium">Agent 2: Event Taxonomy Parser</span></li>
              <li><span className="text-gray-400 font-medium">Deterministic Ranking Engine</span></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© 2026 AllCollegeEvent.com - All Rights Reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted for <span className="text-blue-400 font-bold">Hackathon 2026</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
