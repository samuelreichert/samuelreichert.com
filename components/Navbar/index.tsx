import { Command } from 'lucide-react'
import { useKBar } from 'kbar'
import Link from 'next/link'
import { NavbarItem } from './NavbarItem'
import { ThemeButton } from './ThemeButton'
import {
  Aside,
  ButtonHeader,
  ButtonLogo,
  Header,
  List,
  Nav,
} from './index.styles'

export default function Navbar() {
  const pages = ['About', 'Projects', 'Side projects', 'Uses', 'Reminder']
  const { query } = useKBar()

  return (
    <Header>
      <Link href="/" passHref legacyBehavior>
        <ButtonLogo as="a">s</ButtonLogo>
      </Link>

      <Nav>
        <List>
          {pages.map(page => (
            <NavbarItem key={page} page={page} />
          ))}
        </List>
      </Nav>

      <Aside>
        <ThemeButton />
        <ButtonHeader
          as="button"
          type="button"
          aria-label="Command"
          onClick={query.toggle}
          css={{ marginLeft: 8, padding: '0 8px' }}
        >
          <Command size={20} />
        </ButtonHeader>
      </Aside>
    </Header>
  )
}
