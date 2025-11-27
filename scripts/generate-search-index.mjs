import { getCollection } from 'astro:content';
import fs from 'fs/promises';

async function generateSearchIndex() {
  const docs = await getCollection('docs');
  const searchIndex = docs.map(doc => ({
    slug: doc.slug,
    title: doc.data.title,
    content: doc.body, // In a real app, you might want to process this further
  }));

  await fs.writeFile('./public/search-index.json', JSON.stringify(searchIndex, null, 2));
  console.log('Search index generated!');
}

generateSearchIndex();
