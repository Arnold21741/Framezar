import type { MetadataRoute } from 'next';

const routes = ['', '/explore', '/pricing', '/about', '/early-access', '/contact', '/terms', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://framezar.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7
  }));
}
