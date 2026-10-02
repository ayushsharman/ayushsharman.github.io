import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({ title: z.string(), summary: z.string(), org: z.enum(['clear', 'medoc']), year: z.string() }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({ title: z.string(), summary: z.string(), source: z.string(), date: z.string() }),
});

export const collections = { work, writing };
