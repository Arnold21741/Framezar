'use client';

import { useEffect, useState } from 'react';

type SocialShareMenuProps = {
  shareUrl: string;
  imageTitle: string;
};

export default function SocialShareMenu({ shareUrl, imageTitle }: SocialShareMenuProps) {
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`Check out this photo: ${imageTitle}`);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && Boolean(navigator.share));
  }, []);

  const handleNativeShare = async () => {
    if (!canShare) return;
    try {
      await navigator.share({ title: imageTitle, text: imageTitle, url: shareUrl });
    } catch {
      // Silently ignore share cancellation
    }
  };

  const copyToClipboard = async () => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-3 rounded-[28px] border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-950">Share</h3>
        {canShare ? (
          <button onClick={handleNativeShare} className="dark-glass-button rounded-full px-3 py-1 text-xs font-semibold">
            Native share
          </button>
        ) : null}
      </div>
      <div className="grid gap-2">
        <a href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noreferrer" className="block rounded-3xl border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-brand hover:text-brand">
          WhatsApp
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" className="block rounded-3xl border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-brand hover:text-brand">
          Facebook
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`} target="_blank" rel="noreferrer" className="block rounded-3xl border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-brand hover:text-brand">
          X / Twitter
        </a>
        <button onClick={copyToClipboard} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-left text-slate-700 transition hover:border-brand hover:text-brand">
          {copied ? 'Copied' : 'Copy image link'}
        </button>
        <button className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-left text-slate-700 transition hover:border-brand hover:text-brand">
          Download for Instagram
        </button>
      </div>
    </div>
  );
}
