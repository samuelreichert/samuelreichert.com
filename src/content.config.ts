import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const localizedText = z.object({
  en: z.string().min(1),
  pt: z.string().min(1),
});
const experience = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    companyUrl: z.url().optional(),
    title: localizedText,
    startDate: z.string(),
    endDate: z.string(),
    order: z.number(),
    description: localizedText,
    bullets: z.object({ en: z.array(z.string()), pt: z.array(z.string()) }),
    skills: z.array(z.string()),
  }),
});
const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: localizedText,
    category: localizedText,
    repo: z.url(),
    demo: z.url().optional(),
    tags: z.array(z.string()),
    order: z.number(),
    visual: z.enum(["flowboard", "poupai", "pocket", "spotify"]),
    inDevelopment: z.boolean().default(false),
  }),
});
export const collections = { experience, projects };
