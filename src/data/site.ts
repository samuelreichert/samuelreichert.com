export const siteConfig = {
  name: 'Samuel Reichert',
  title: 'Samuel Reichert — Frontend Engineer',
  description:
    'Frontend engineer focused on React, React Native, and Node.js with 8+ years of experience.',
  url: 'https://samuelreichert.com',
  email: 'samuelreichertt@gmail.com',
  github: 'https://github.com/samuelreichert',
  linkedin: 'https://www.linkedin.com/in/samuelreichert',
  resumeUrl:
    'https://docs.google.com/document/d/1hEMCGXnCpBwDHi2ZeiyWFHiCd9eKm7nkOpoBeCLR94E/export?format=pdf',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
