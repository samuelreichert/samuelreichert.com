const fallbackSiteUrl = 'https://samuelreichert.dev';
const fallbackResumeUrl =
  'https://docs.google.com/document/d/1hEMCGXnCpBwDHi2ZeiyWFHiCd9eKm7nkOpoBeCLR94E/export?format=pdf';

const envString = (value: unknown, fallback: string) =>
  typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;

export const siteConfig = {
  name: 'Samuel Reichert',
  title: 'Samuel Reichert — Frontend Engineer',
  description:
    'Frontend engineer focused on React, React Native, and Node.js with 10+ years of experience.',
  url: envString(import.meta.env.PUBLIC_SITE_URL, fallbackSiteUrl),
  email: 'samuelreichertt@gmail.com',
  github: 'https://github.com/samuelreichert',
  linkedin: 'https://www.linkedin.com/in/samuelreichert',
  resumeUrl: envString(import.meta.env.PUBLIC_RESUME_URL, fallbackResumeUrl),
  nav: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
