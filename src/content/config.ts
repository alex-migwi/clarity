import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    lastUpdated: z.date().optional(),
    contributors: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'docs': docsCollection,
};
