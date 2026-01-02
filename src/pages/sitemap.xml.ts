import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { clarityConfig } from '../../../clarity.config';

export const GET: APIRoute = async ({ site }) => {
  const allDocs = await getCollection('docs', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const baseUrl = clarityConfig.site.url || site?.toString() || '';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${allDocs.map((doc) => `  <url>
    <loc>${baseUrl}/docs/${doc.slug}</loc>
    <lastmod>${doc.data.lastUpdated ? new Date(doc.data.lastUpdated).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};
