import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AllCollegeEvent.AI - Smart Recommendation Platform',
  description: 'AI-powered event recommendations and intelligence layer for college hackathons, workshops, and internships.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#070a12] text-gray-100 flex flex-col min-h-screen">
        <AuthProvider>
          {/* Background Ambient Glow Blobs */}
          <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full pointer-events-none glow-bg-blob-1 -z-10" />
          <div className="fixed bottom-10 right-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full pointer-events-none glow-bg-blob-2 -z-10" />

          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
