import { Arrow, Content, Item } from '@radix-ui/react-dropdown-menu'
import { keyframes, styled } from '../../stitches.config'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

export const DropdownMenuArrow = styled(Arrow, { fill: '$dropdownBackground' })

export const DropdownMenuContent = styled(Content, {
  minWidth: 220,
  backgroundColor: '$dropdownBackground',
  borderRadius: 6,
  padding: 5,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
})

export const DropdownMenuItem = styled(Item, {
  all: 'unset',
  alignItems: 'center',
  display: 'flex',
  borderRadius: 3,
  color: '$dropdownColor',
  fontSize: 13,
  fontWeight: '500',
  lineHeight: 1,
  height: 25,
  marginBottom: 6,
  padding: '4px 12px',
  position: 'relative',
  // paddingLeft: 25,
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$grey',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: '$dropdownColor',
    color: '$background',
  },

  '&:last-child': {
    marginBottom: 0,
  },
})

export const RightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
})
