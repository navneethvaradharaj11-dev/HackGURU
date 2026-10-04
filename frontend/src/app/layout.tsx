import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AllCollegeEvent.com — Discover College Events, Hackathons & Opportunities',
  description: 'India\'s leading platform for college students to discover hackathons, workshops, competitions, internships and technical events. AI-powered personalized recommendations.',
  icons: {
    icon: [
      { url: '/favicon.svg?v=ace4', type: 'image/svg+xml' },
      { url: '/icon.png?v=ace4', sizes: '512x512', type: 'image/png' },
      { url: '/favicon-32.png?v=ace4', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico?v=ace4' },
    ],
    shortcut: '/favicon.ico?v=ace4',
    apple: '/apple-icon.png?v=ace4',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900 flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
