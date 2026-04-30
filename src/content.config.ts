import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    companyUrl: z.string().url().optional(),
    title: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    order: z.number(),
    description: z.string(),
    bullets: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    repo: z.string().url(),
    demo: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

export const collections = { experience, projects };
