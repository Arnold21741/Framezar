import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Framezar - Deliver your work beautifully',
  description: 'A premium image delivery platform for photographers and videographers.'
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
