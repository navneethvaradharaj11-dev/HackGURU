'use client';

import React from 'react';
import { Sparkles, Cpu, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 glass-panel mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white">AllCollegeEvent<span className="text-blue-400">.AI</span></span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              AI-powered recommendation engine and intelligent event discovery platform for students. Powered by HackGuru 2026 multi-provider gateway (Gemini, OpenAI, Hugging Face).
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-medium border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Express Backend API Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[11px] font-medium border border-indigo-500/20">
                <Cpu className="w-3.5 h-3.5" /> Multi-LLM Gateway Pool Connected
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Platform Navigation</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="/dashboard" className="hover:text-blue-400 transition-colors">Student Dashboard</a></li>
              <li><a href="/recommendations" className="hover:text-blue-400 transition-colors">AI Recommendations Feed</a></li>
              <li><a href="/events" className="hover:text-blue-400 transition-colors">Event Catalog & Search</a></li>
              <li><a href="/calendar" className="hover:text-blue-400 transition-colors">Calendar & Reminders</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">AI Intelligence</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="/ai-telemetry" className="hover:text-blue-400 transition-colors">AI Usage & Cost Telemetry</a></li>
              <li><span className="text-gray-500">Agent 1: Opportunity Matcher</span></li>
              <li><span className="text-gray-500">Agent 2: Event Tagging Parser</span></li>
              <li><span className="text-gray-500">Deterministic Ranking Engine</span></li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 AllCollegeEvent.com - HackGuru AI Backend Integration.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Hackathon 2026
          </p>
        </div>
      </div>
    </footer>
  );
};
