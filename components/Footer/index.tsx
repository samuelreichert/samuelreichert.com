import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FC } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { config } from '../../stitches.config'
import { Anchor, Container, Icon, Title } from './styles'

type LinkType = {
  icon: LucideIcon
  title: string
  url: string
}

const LINKS: LinkType[] = [
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

const renderAnchor = (link: LinkType, index: number) => {
  const isDesktop = useMediaQuery(config.media.bp2)
  const LinkIcon = link.icon
  if (link.url.startsWith('http')) {
    return (
      <Anchor key={index} href={link.url} target="_blank">
        <Title>{link.title}</Title>
        <Icon>
          <LinkIcon size={isDesktop ? 16 : 24} />
        </Icon>
      </Anchor>
    )
  }

  return (
    <Anchor key={index} href={link.url}>
      <Title>{link.title}</Title>
      <Icon>
        <LinkIcon size={isDesktop ? 16 : 24} />
      </Icon>
    </Anchor>
  )
}

export const Footer: FC = () => {
  return <Container>{LINKS.map(renderAnchor)}</Container>
}
