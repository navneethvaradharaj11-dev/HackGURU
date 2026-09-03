'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Target,
  Trophy,
  Brain,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Award
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6 shadow-inner animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            HackGuru 2026 AI Intelligence Engine Enabled
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight">
            Discover Hackathons & Events Powered by <br />
            <span className="gradient-text">Autonomous AI Intelligence</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Stop searching manually through hundreds of college portals. Our multi-agent LLM recommendation pipeline parses your career goals, branch, and skill gap to deliver hyper-personalized opportunities in real-time.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="glow-button w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-base shadow-xl"
            >
              Launch Student Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/recommendations"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-gray-200 glass-card hover:text-white flex items-center justify-center gap-2 text-base"
            >
              <Sparkles className="w-5 h-5 text-blue-400" /> View AI Match Feed
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-5 rounded-2xl text-center border border-white/10">
              <p className="text-3xl font-extrabold text-white">10,000+</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Events Analyzed</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl text-center border border-white/10">
              <p className="text-3xl font-extrabold text-blue-400">17 Keys</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">AI Provider Gateway</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl text-center border border-white/10">
              <p className="text-3xl font-extrabold text-purple-400">98.4%</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Match Precision</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl text-center border border-white/10">
              <p className="text-3xl font-extrabold text-emerald-400">&lt;120ms</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Ranking Engine Speed</p>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Engineered for Next-Gen Student Growth
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
              Behind AllCollegeEvent.AI operates a dual-agent neural orchestration layer backed by deterministic scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Agent 1: Opportunity Matcher</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Evaluates top candidate events against your unique branch, degree, career path, and past interactions to generate personalized natural language match reasoning.
              </p>
              <div className="mt-6 flex items-center text-xs font-semibold text-blue-400 gap-1">
                Explore Feed <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Agent 2: Event Parser</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Scrapes and ingests unstructured college brochures, extracting domain tags, difficulty ratings, prerequisites, and learning outcome taxonomy automatically.
              </p>
              <div className="mt-6 flex items-center text-xs font-semibold text-purple-400 gap-1">
                View Event Catalog <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Multi-LLM Provider Pool</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Centralized AI Gateway managing 10 Gemini keys, 5 OpenAI keys, 2 HuggingFace models, and offline fallback to ensure 99.99% uptime with zero quota failures.
              </p>
              <div className="mt-6 flex items-center text-xs font-semibold text-cyan-400 gap-1">
                Check AI Telemetry <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive AI Preview Banner */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="w-64 h-64 text-blue-400" />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  Ready to test your recommendation profile?
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                  Connect with the HackGuru Backend API
                </h2>
                <p className="text-gray-300 text-sm mt-2 max-w-lg">
                  Register your student profile or test out our live backend endpoints for events, notifications, and AI model usage.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/register"
                  className="glow-button px-6 py-3 rounded-xl font-bold text-white text-sm"
                >
                  Create Student Account
                </Link>
                <Link
                  href="/ai-telemetry"
                  className="px-6 py-3 rounded-xl glass-card text-gray-200 hover:text-white font-semibold text-sm"
                >
                  View Telemetry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
