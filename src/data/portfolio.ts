import { getCollection } from "astro:content";

export async function getProjects() {
  return (await getCollection("projects")).sort(
    (a, b) => a.data.order - b.data.order,
  );
}

export async function getExperience() {
  return (await getCollection("experience")).sort(
    (a, b) => a.data.order - b.data.order,
  );
}

export const expertiseGroups = [
  {
    key: "web",
    skills: ["React", "TypeScript", "Next.js", "Vue.js", "Node.js", "GraphQL"],
  },
  { key: "mobile", skills: ["React Native", "Expo"] },
  { key: "quality", skills: ["Playwright", "Vitest", "Jest", "Git"] },
] as const;
