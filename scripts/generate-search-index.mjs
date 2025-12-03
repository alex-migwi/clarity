import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSearchIndex() {
  const docsPath = path.join(__dirname, '../src/content/docs');
  const searchIndex = [];

  async function processDirectory(dir, basePath = '') {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath, relativePath);
      } else if (entry.name.endsWith('.md')) {
        const content = await fs.readFile(fullPath, 'utf-8');
        const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
        
        // Extract frontmatter title
        const titleMatch = content.match(/^---\s*\n.*?title:\s*["'](.+?)["']/ms);
        const title = titleMatch ? titleMatch[1] : slug;
        
        // Remove frontmatter and extract content
        const bodyContent = content.replace(/^---\s*\n.*?\n---\s*\n/s, '');
        
        searchIndex.push({
          slug,
          title,
          content: bodyContent.substring(0, 500), // First 500 chars for search
        });
      }
    }
  }

  await processDirectory(docsPath);
  await fs.writeFile(
    path.join(__dirname, '../public/search-index.json'), 
    JSON.stringify(searchIndex, null, 2)
  );
  console.log(`✅ Search index generated with ${searchIndex.length} documents!`);
}

generateSearchIndex().catch(console.error);
