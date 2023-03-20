import { Moon, RefreshCw, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ButtonHeader } from './index.styles'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  RightSlot,
} from './ThemeButton.styles'
import { useHasMounted } from '../../hooks/useHasMounted'

export const ThemeButton: FC = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const hasMounted = useHasMounted()

  const ResolvedIcon = hasMounted && resolvedTheme === 'dark' ? Moon : Sun

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <ButtonHeader
          as="button"
          type="button"
          aria-label="Customise theme"
          css={{ padding: '0 8px' }}
        >
          <ResolvedIcon size={20} />
        </ButtonHeader>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenuContent sideOffset={4} align="end">
          <DropdownMenuItem onSelect={() => setTheme('dark')} textValue="dark">
            Dark theme{' '}
            <RightSlot>
              <Moon size={18} strokeWidth={1} />
            </RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setTheme('light')}
            textValue="light"
          >
            Light theme{' '}
            <RightSlot>
              <Sun size={18} strokeWidth={1} />
            </RightSlot>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setTheme('system')}
            textValue="system"
          >
            Sync with system{' '}
            <RightSlot>
              <RefreshCw size={18} strokeWidth={1} />
            </RightSlot>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
