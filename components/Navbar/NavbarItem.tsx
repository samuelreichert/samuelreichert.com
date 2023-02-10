import { FC, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { titleToUrl } from '../../lib/titleToUrl'
import { Anchor, NavContainer, NavHovered } from './NavbarItem.styles'

type NavbarItemProps = {
  page: string
}

export const NavbarItem: FC<NavbarItemProps> = ({ page }) => {
  const router = useRouter()
  const [hovered, setHovered] = useState('')
  const path = `/${titleToUrl(page)}`
  const isHovered = hovered === page

  return (
    <li>
      <Link href={path} passHref legacyBehavior>
        <Anchor>
          <NavContainer
            onHoverStart={() => setHovered(page)}
            onHoverEnd={() => setHovered('')}
            css={
              router.pathname == path
                ? {
                    color: '$primary',
                    '&::after': { opacity: 1 },
                  }
                : {}
            }
          >
            {isHovered && <NavHovered layoutId="nav" />}
            {page}
          </NavContainer>
        </Anchor>
      </Link>
    </li>
  )
}
