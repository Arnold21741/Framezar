'use client';

import { useState } from 'react';

type PhotographerShowcaseSettingsProps = {
  initialShowcaseEnabled: boolean;
  photographerLogo: string;
  photographerName: string;
};

export default function PhotographerShowcaseSettings({
  initialShowcaseEnabled,
  photographerLogo,
  photographerName
}: PhotographerShowcaseSettingsProps) {
  const [showcaseEnabled, setShowcaseEnabled] = useState(initialShowcaseEnabled);

  return (
    <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-6 shadow-soft">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-3xl bg-slate-100">
          <img src={photographerLogo} alt={`${photographerName} logo`} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Photographer spotlight</p>
          <p className="mt-2 text-xl font-semibold text-slate-950">{photographerName}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm text-slate-600">Showcase your work on the public Explore page and create a stronger brand presence.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowcaseEnabled((current) => !current)}
          className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${showcaseEnabled ? 'dark-glass-button' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          {showcaseEnabled ? 'Showcase enabled' : 'Showcase disabled'}
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {showcaseEnabled
          ? 'Your portfolio and logo will appear on the website when this is enabled.'
          : 'Clients can still use Framezar; your work will not show on the public pages until enabled.'}
      </p>
    </div>
  );
}
