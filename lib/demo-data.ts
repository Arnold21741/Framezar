export type GalleryImage = {
  id: string;
  title: string;
  src: string;
  width: number;
  height: number;
  description: string;
};

export type DemoGallery = {
  id: string;
  title: string;
  clientName: string;
  eventDate: string;
  description: string;
  tags: string[];
  venue: string;
  galleryType: string;
  heroImage: string;
  coverImage: string;
  createdAt: string;
  imageCount: number;
  passwordProtected: boolean;
  images: GalleryImage[];
};

export const galleries: DemoGallery[] = [
  {
    id: 'midsummer-dreams',
    title: 'Midsummer Dreams',
    clientName: 'Ava Laurent',
    eventDate: 'June 9, 2025',
    description: 'A soft documentary collection with editorial lighting, intimate details, and cinematic portraiture.',
    tags: ['2025', 'June', 'Lourensford Wine Estate', 'Wedding', 'golden hour', 'outdoor ceremony'],
    venue: 'Lourensford Wine Estate',
    galleryType: 'Wedding',
    heroImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    createdAt: 'Apr 25, 2025',
    imageCount: 28,
    passwordProtected: true,
    images: [
      {
        id: 'midsummer-1',
        title: 'Golden Hour Bride',
        src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 1600,
        description: 'A warm portrait under afternoon light.'
      },
      {
        id: 'midsummer-2',
        title: 'Soft Details',
        src: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 900,
        description: 'Film-inspired still life from the session.'
      },
      {
        id: 'midsummer-3',
        title: 'Editorial Portrait',
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 1600,
        description: 'Cinematic portrait with a premium mood.'
      },
      {
        id: 'midsummer-4',
        title: 'Evening Embrace',
        src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 900,
        description: 'A quiet moment after sunset.'
      },
      {
        id: 'midsummer-5',
        title: 'Fine Art Detail',
        src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 900,
        description: 'Styled detail shot from the album.'
      }
    ]
  },
  {
    id: 'studio-sessions',
    title: 'Studio Session Edit',
    clientName: 'Mila & Co.',
    eventDate: 'March 16, 2025',
    description: 'Minimal editorial portraits and clean studio lighting for an elevated brand story.',
    tags: ['2025', 'March', 'Studio 44', 'Branding', 'editorial', 'minimal studio'],
    venue: 'Studio 44',
    galleryType: 'Branding',
    heroImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    createdAt: 'Mar 16, 2025',
    imageCount: 18,
    passwordProtected: false,
    images: [
      {
        id: 'studio-1',
        title: 'Minimal Portrait',
        src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 1600,
        description: 'Portrait with soft shadow and studio polish.'
      },
      {
        id: 'studio-2',
        title: 'Moody Composition',
        src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 900,
        description: 'A moody editorial capture for the campaign.'
      },
      {
        id: 'studio-3',
        title: 'Storytelling Frame',
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 1600,
        description: 'A crisp studio shot with luxury feel.'
      }
    ]
  }
];

export type DemoAccount = {
  id: string;
  name: string;
  email: string;
  planName: string;
  storageLimit: string;
  usedStorage: string;
  storageUsedPercentage: number;
  galleries: number;
  deliveryLinks: number;
  photographerLogo: string;
  showcaseEnabled: boolean;
};

export const demoAccount: DemoAccount = {
  id: 'lena-reed',
  name: 'Lena Reed',
  email: 'lena@framezar.com',
  planName: 'Pro',
  storageLimit: '15 GB',
  usedStorage: '3.4 GB',
  storageUsedPercentage: 23,
  galleries: 2,
  deliveryLinks: 11,
  photographerLogo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  showcaseEnabled: true
};

export const getGalleryById = (id: string) => galleries.find((gallery) => gallery.id === id);
