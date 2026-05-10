import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50">
      <div className="page-container flex flex-col gap-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p>Framezar - premium image delivery for photographers and videographers.</p>
          <p className="mt-2">Built for elegant galleries, private client delivery, and launch-stage studios.</p>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link href="/early-access" className="hover:text-slate-950">Early access</Link>
          <Link href="/contact" className="hover:text-slate-950">Contact</Link>
          <Link href="/privacy" className="hover:text-slate-950">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-950">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
