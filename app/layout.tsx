import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/supabase/AuthContext';

export const metadata: Metadata = {
  title: 'Echo | Modern Text & Image Community Feed',
  description: 'A lightweight, fast, and minimalist social feed strictly designed for high-quality text and images.',
  keywords: ['social media', 'feed', 'community', 'text posts', 'photography', 'minimalist'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
