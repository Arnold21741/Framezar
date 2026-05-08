'use client';

import { DragEvent, useEffect, useRef, useState } from 'react';

type DeliveryCardProps = {
  title: string;
  photographer: string;
  subtitle: string;
  initialSide: 'left' | 'right';
  defaultImage: string;
  editable?: boolean;
  layout?: 'split' | 'stacked';
  showControls?: boolean;
};

export default function DeliveryCard({
  title,
  photographer,
  subtitle,
  initialSide,
  defaultImage,
  editable = false,
  layout = 'split',
  showControls = true
}: DeliveryCardProps) {
  const [logoSide, setLogoSide] = useState<'left' | 'right'>(initialSide);
  const [heroImage, setHeroImage] = useState<string>(defaultImage);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setHeroImage(objectUrl);
    setSelectedFileName(file.name);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const isStacked = layout === 'stacked';

  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className={`flex flex-col overflow-hidden ${isStacked ? '' : `lg:flex-row ${logoSide === 'right' ? 'lg:flex-row-reverse' : ''}`}`}>
        <div className={`flex w-full flex-col gap-6 border-b border-slate-200/70 bg-slate-50 p-6 ${isStacked ? '' : 'lg:w-[38%] lg:border-r lg:border-b-0'}`}>
          <div className={`flex gap-4 ${isStacked ? 'flex-col' : 'items-start justify-between'}`}>
            <div className="flex items-center gap-4">
              <div className="dark-glass flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl">
                <span className="text-xs uppercase tracking-[0.35em]">Logo</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{photographer}</p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-950">{title}</h2>
              </div>
            </div>
            {!isStacked ? (
              <span className="dark-glass rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em]">Delivery card</span>
            ) : null}
          </div>

          <p className="text-sm leading-6 text-slate-600">{subtitle}</p>

          {showControls ? (
            <div className="space-y-3 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Logo placement</p>
              <div className="grid grid-cols-2 gap-3">
                {(['left', 'right'] as const).map((side) => (
                  <button
                    key={side}
                    type="button"
                    onClick={() => setLogoSide(side)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      logoSide === side
                        ? 'dark-glass-button shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {side === 'left' ? 'Left' : 'Right'}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {editable ? (
            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Hero image</p>
              <div
                className={`mt-4 flex min-h-[170px] flex-col items-center justify-center rounded-[28px] border-2 border-dashed p-6 text-center transition ${
                  dragActive ? 'border-brand bg-brand/5' : 'border-slate-300 bg-slate-50'
                } cursor-pointer`}
                onClick={handleSelectFile}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <p className="text-sm font-semibold text-slate-900">Drag & drop an image here</p>
                <p className="mt-2 text-sm text-slate-600">or click to choose a hero image.</p>
                {selectedFileName ? (
                  <p className="mt-3 text-xs text-slate-500">Selected: {selectedFileName}</p>
                ) : null}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleFiles(event.target.files)}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className={`relative flex-1 overflow-hidden bg-slate-100 ${isStacked ? 'min-h-[360px]' : 'min-h-[340px]'}`}>
          <img src={heroImage} alt="Hero preview" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
          <div className={`absolute bottom-0 p-6 ${logoSide === 'right' ? 'left-0 right-auto max-w-sm' : 'left-auto right-0 max-w-sm'}`}>
            <div className="dark-glass rounded-[28px] p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Client delivery preview</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">This layout gives your galleries a premium cover card, balanced logo placement, and a hero image that feels editorial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
