import { FC } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { config } from '../../stitches.config'
import { LinkType } from './constants'
import { Anchor as AnchorElement, Icon, Title } from './styles'

type AnchorProps = {
  link: LinkType
}

export const Anchor: FC<AnchorProps> = ({ link }) => {
  const isDesktop = useMediaQuery(config.media.bp2)
  const LinkIcon = link.icon
  const target = link.url.startsWith('http') ? '_blank' : '_self'

  return (
    <AnchorElement href={link.url} target={target}>
      <Title>{link.title}</Title>
      <Icon>
        <LinkIcon size={isDesktop ? 16 : 24} />
      </Icon>
    </AnchorElement>
  )
}
