import { notFound } from 'next/navigation';
import { getGalleryById } from '@/lib/demo-data';
import GalleryPublicView from '@/components/GalleryPublicView';

interface PageProps {
  params: { id: string };
}

export default function GalleryPage({ params }: PageProps) {
  const gallery = getGalleryById(params.id);
  if (!gallery) {
    notFound();
  }

  return <GalleryPublicView gallery={gallery} />;
}
