import { FC } from 'react'
import { Anchor } from './Anchor'
import { FOOTER_LINKS } from './constants'
import { Container } from './styles'

export const Footer: FC = () => {
  return (
    <Container>
      {FOOTER_LINKS.map((link, index) => (
        <Anchor link={link} key={index} />
      ))}
    </Container>
  )
}
