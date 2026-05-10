import type { CoverDesignId } from '@/lib/cover-designs';

type GalleryCoverPreviewProps = {
  design: CoverDesignId;
  title: string;
  clientName: string;
  eventDate: string;
  passwordProtected: boolean;
  size?: 'thumb' | 'large' | 'mobile';
};

const photos = {
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  desert: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
  fashion: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  portrait: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  studio: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
  couple: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80'
};

function PhotoVisual({
  photo = photos.wedding,
  className = '',
  overlay = 'linear-gradient(180deg,rgba(15,23,42,0.06),rgba(15,23,42,0.18))'
}: {
  photo?: string;
  className?: string;
  overlay?: string;
}) {
  return (
    <div
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage: `${overlay}, url(${photo})` }}
    />
  );
}

function formatDate(value: string) {
  if (!value) return 'Event date';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? 'h-9 w-9 text-[8px]' : 'h-12 w-12 text-[10px]'} flex items-center justify-center rounded-full border border-slate-200 bg-white text-center font-semibold uppercase tracking-[0.28em] text-slate-950 shadow-sm`}>
      Logo
    </div>
  );
}

function OpenButton({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`${dark ? 'border-white/40 bg-white/15 text-white' : 'border-slate-300 bg-white/80 text-slate-950'} pointer-events-none rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.18em]`}
    >
      Open
    </span>
  );
}

export default function GalleryCoverPreview({
  design,
  title,
  clientName,
  eventDate,
  passwordProtected,
  size = 'large'
}: GalleryCoverPreviewProps) {
  const isThumb = size === 'thumb';
  const isMobile = size === 'mobile';
  const shellClass = isThumb
    ? 'h-44 rounded-[24px] p-3 text-[10px]'
    : isMobile
      ? 'h-[520px] rounded-[30px] p-4 text-xs'
      : 'min-h-[420px] rounded-[32px] p-6 text-sm';
  const safeTitle = title || 'Gallery title';
  const safeClient = clientName || 'Client name';
  const dateLabel = formatDate(eventDate);
  const accessLabel = passwordProtected ? 'Private gallery' : 'Open gallery';

  if (design === 'editorial-banner') {
    return (
      <div className={`${shellClass} flex overflow-hidden border border-slate-200 bg-white shadow-soft`}>
        <div className="flex min-h-full flex-1 flex-col overflow-hidden rounded-[inherit] bg-white">
          <PhotoVisual photo={photos.desert} className="flex-1 rounded-t-[inherit]" />
          <div className={`${isMobile ? 'flex-col items-start px-4 py-4' : 'items-center justify-between px-5 py-4'} flex gap-4 border-t border-slate-100 bg-white`}>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">{safeClient}</p>
              <h3 className={`${isThumb ? 'text-sm' : isMobile ? 'text-lg' : 'text-xl'} ${isMobile ? '' : 'truncate'} font-medium tracking-wide text-slate-950`}>{safeTitle}</h3>
            </div>
            <OpenButton />
          </div>
        </div>
      </div>
    );
  }

  if (design === 'split-minimal') {
    return (
      <div className={`${shellClass} grid overflow-hidden border border-slate-200 bg-white shadow-soft ${isMobile ? 'grid-rows-[1.1fr_0.9fr]' : isThumb ? 'grid-cols-[0.9fr_1.1fr]' : 'grid-cols-[0.8fr_1.2fr]'}`}>
        <PhotoVisual photo={photos.fashion} className={`${isMobile ? 'rounded-t-[inherit]' : 'rounded-l-[inherit]'}`} />
        <div className="flex flex-col items-center justify-center gap-5 bg-white px-5 text-center">
          <BrandMark compact={isThumb} />
          <div>
            <h3 className={`${isThumb ? 'text-sm' : isMobile ? 'text-xl' : 'text-2xl'} font-serif text-slate-950`}>{safeClient}</h3>
            <div className="mx-auto mt-3 h-px w-10 bg-slate-400" />
          </div>
          <OpenButton />
        </div>
      </div>
    );
  }

  if (design === 'classic-logo-top') {
    return (
      <div className={`${shellClass} flex flex-col overflow-hidden border border-slate-200 bg-white shadow-soft`}>
        <div className="flex justify-center pb-3">
          <div className="text-center">
            <h3 className={`${isThumb ? 'text-lg' : isMobile ? 'text-2xl' : 'text-3xl'} font-serif uppercase tracking-[0.12em] text-slate-950`}>{safeClient}</h3>
            <p className="text-[10px] uppercase tracking-[0.55em] text-slate-500">Photography</p>
          </div>
        </div>
        <PhotoVisual photo={photos.wedding} className="flex-1 rounded-[20px]" overlay="linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.22))" />
        <div className={`${isMobile ? 'flex-col items-start' : 'items-center justify-between'} flex gap-4 pt-5`}>
          <h4 className={`${isThumb ? 'text-sm' : isMobile ? 'text-xl' : 'text-2xl'} font-serif tracking-wide text-slate-950`}>{safeTitle}</h4>
          <OpenButton />
        </div>
      </div>
    );
  }

  if (design === 'modern-overlay') {
    return (
      <div className={`${shellClass} relative overflow-hidden border border-slate-200 shadow-soft`}>
        <PhotoVisual photo={photos.couple} className="absolute inset-0" overlay="linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.42))" />
        <div className="absolute inset-0 bg-slate-950/20" />
        <div className="absolute inset-x-5 bottom-5 rounded-[24px] border border-white/20 bg-slate-950/65 p-5 text-white backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-200">{accessLabel}</p>
          <h3 className={`${isThumb ? 'text-lg' : isMobile ? 'text-2xl' : 'text-3xl'} mt-2 font-semibold`}>{safeTitle}</h3>
          <p className="mt-2 text-xs text-slate-200">{safeClient} · {dateLabel}</p>
          {!isThumb ? <div className="mt-5"><OpenButton dark /></div> : null}
        </div>
      </div>
    );
  }

  if (design === 'brand-sidebar') {
    return (
      <div className={`${shellClass} grid overflow-hidden border border-slate-200 bg-white shadow-soft ${isMobile ? 'grid-rows-[0.75fr_1.25fr]' : isThumb ? 'grid-cols-[0.8fr_1.2fr]' : 'grid-cols-[0.65fr_1.35fr]'}`}>
        <div className="flex flex-col justify-between bg-slate-50 p-5">
          <BrandMark compact={isThumb} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-brand">{accessLabel}</p>
            <h3 className={`${isThumb ? 'text-sm' : isMobile ? 'text-xl' : 'text-2xl'} mt-2 font-semibold text-slate-950`}>{safeTitle}</h3>
            {!isThumb ? <p className="mt-3 text-sm text-slate-500">{safeClient}</p> : null}
          </div>
        </div>
        <PhotoVisual photo={photos.portrait} className={`${isMobile ? 'rounded-b-[inherit]' : 'rounded-r-[inherit]'}`} />
      </div>
    );
  }

  return (
    <div className={`${shellClass} flex flex-col overflow-hidden border border-slate-200 bg-white shadow-soft`}>
      <div className="flex flex-1 flex-col justify-center rounded-[24px] bg-white px-6">
        <PhotoVisual photo={photos.studio} className="mx-auto w-full max-w-3xl flex-1 rounded-[12px] border border-slate-100" overlay="linear-gradient(180deg,rgba(255,255,255,0.06),rgba(15,23,42,0.12))" />
      </div>
      <div className={`${isMobile ? 'flex-col items-start' : 'items-center justify-between'} flex gap-4 px-6 pb-2 pt-5`}>
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">{dateLabel}</p>
          <h3 className={`${isThumb ? 'text-sm' : isMobile ? 'text-xl' : 'text-2xl'} font-serif tracking-wide text-slate-950`}>{safeTitle}</h3>
        </div>
        <OpenButton />
      </div>
    </div>
  );
}
