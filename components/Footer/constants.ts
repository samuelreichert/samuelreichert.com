import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type LinkType = {
  icon: LucideIcon
  title: string
  url: string
}

export const FOOTER_LINKS: LinkType[] = [
  {
    title: 'Email',
    url: '/contact',
    icon: Mail,
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/samuel_reichert',
    icon: Twitter,
  },
  {
    title: 'GitHub',
    url: 'https://github.com/samuelreichert',
    icon: Github,
  },
  {
    title: 'linkedin',
    url: 'https://www.linkedin.com/in/samuelreichert',
    icon: Linkedin,
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/samuelreichert',
    icon: Instagram,
  },
]
