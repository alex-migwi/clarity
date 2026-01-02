import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
    protected: z.boolean().optional().default(false), // v1.1: Route protection
    image: z.string().optional(),
    lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), // YYYY-MM-DD format
    contributors: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'docs': docsCollection,
};
