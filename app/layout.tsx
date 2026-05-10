import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://framezar.com'),
  title: {
    default: 'Framezar - Premium Client Galleries for Photographers',
    template: '%s | Framezar'
  },
  description: 'Framezar helps photographers deliver polished private galleries, client previews, favorites, and download-ready image experiences.',
  keywords: ['photography galleries', 'client galleries', 'image delivery', 'photographer portfolio', 'private galleries'],
  openGraph: {
    title: 'Framezar - Premium Client Galleries for Photographers',
    description: 'Private image delivery and gallery presentation for modern photographers.',
    url: 'https://framezar.com',
    siteName: 'Framezar',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Framezar - Premium Client Galleries for Photographers',
    description: 'Private image delivery and gallery presentation for modern photographers.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(55,114,255,0.12),transparent_38%),linear-gradient(to_bottom,#ffffff_0%,#f8fbff_100%)]">
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-24">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
