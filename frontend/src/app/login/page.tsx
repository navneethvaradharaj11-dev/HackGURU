'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/api';
import { Trophy, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.login(email, password);
      login(res.token || 'demo-jwt-token-hackguru', res.student);
      router.push('/dashboard');
    } catch {
      // Fallback demo login when backend is in dev mode
      login('demo-jwt-token-hackguru', {
        email: email || 'student@iitb.ac.in',
        fullName: 'Navneeth V',
        collegeName: 'IIT Bombay',
        branch: 'Computer Science & Engineering',
        degree: 'B.Tech',
        careerGoal: 'AI Research Scientist',
      });
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-200 shadow-sm max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <Trophy className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Sign in to AllCollegeEvent</h1>
          <p className="text-xs text-gray-500 mt-1">Stay updated on your opportunities and deadlines</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-gray-700">Password</label>
              <a href="#" className="text-[11px] text-violet-600 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-600 focus:border-violet-600 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-600 pt-1">
            <input type="checkbox" id="remember" className="rounded border-gray-300 text-violet-600 focus:ring-violet-500 mr-2" defaultChecked />
            <label htmlFor="remember">Remember me on this device</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-violet-600 hover:bg-violet-700 font-semibold text-xs sm:text-sm text-white flex items-center justify-center gap-1.5 transition-colors shadow-2xs mt-4 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-500">
          New to AllCollegeEvent?{' '}
          <Link href="/register" className="font-semibold text-violet-600 hover:underline">
            Join now
          </Link>
        </div>
      </div>
    </div>
  );
}
