export type CoverDesignId =
  | 'editorial-banner'
  | 'split-minimal'
  | 'classic-logo-top'
  | 'modern-overlay'
  | 'brand-sidebar'
  | 'fine-art-frame';

export type CoverDesign = {
  id: CoverDesignId;
  name: string;
  description: string;
};

export const coverDesigns: CoverDesign[] = [
  {
    id: 'editorial-banner',
    name: 'Editorial Banner',
    description: 'Large image-led card with a clean metadata bar.'
  },
  {
    id: 'split-minimal',
    name: 'Split Minimal',
    description: 'Portrait image with a quiet brand panel.'
  },
  {
    id: 'classic-logo-top',
    name: 'Classic Logo Top',
    description: 'Centered studio mark, framed image, and serif title.'
  },
  {
    id: 'modern-overlay',
    name: 'Modern Overlay',
    description: 'Full-bleed cover with a translucent action panel.'
  },
  {
    id: 'brand-sidebar',
    name: 'Brand Sidebar',
    description: 'Logo-first side panel with a wide gallery preview.'
  },
  {
    id: 'fine-art-frame',
    name: 'Fine Art Frame',
    description: 'White-space rich cover for premium wedding albums.'
  }
];
