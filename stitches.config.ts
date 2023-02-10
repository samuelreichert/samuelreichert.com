import { createStitches } from '@stitches/react'

const baseColors = {
  yellow: '#ffff80',
  pink: '#ff80bf',
  purple: '#9580ff',
  red: '#ff9580',
  orange: '#ffca80',
  green: '#8aff80',
  cyan: '#80ffea',
  black: '#08070b',
  white: '#ffffff',
  darkGrey: '#212024',
  grey: '#8f9ba8',
}
const lightColors = {
  primary: baseColors.black,
  background: baseColors.white,
  hover: baseColors.grey,
  dropdownBackground: baseColors.white,
  dropdownColor: baseColors.purple,
  command: 'rgba(0, 0, 0, 0.2)',
  positioner: 'rgba(0, 0, 0, 0.1)',
  resultText: baseColors.white,
}
const darkColors = {
  primary: baseColors.white,
  background: baseColors.black,
  hover: baseColors.darkGrey,
  dropdownBackground: '#2d333b',
  dropdownColor: baseColors.pink,
  command: 'rgba(255, 255, 255, 0.2)',
  positioner: 'rgba(0, 0, 0, 0.8)',
  resultText: baseColors.grey,
}

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...baseColors,
      ...darkColors,
    },
    fonts: {
      body: 'Biotif, sans-serif',
      heading: 'Neuzeit Grotesk Bold, sans-serif',
    },
    space: {
      navHeightDesktop: '60px',
      navHeightMobile: '110px',
    },
    transitions: {
      duration: '0.2s',
    },
    radii: {
      borderRadius: '8px',
    },
  },
  media: {
    bp1: '(min-width: 425px)',
    bp2: '(min-width: 760px)',
    bp3: '(max-width: 780px)',
    bp4: '(max-width: 1024px)',
  },
})

// define the dark theme using the de-constructed function
export const lightTheme = createTheme({
  colors: {
    ...baseColors,
    ...lightColors,
  },
  fonts: {
    body: 'Biotif, sans-serif',
    heading: 'Neuzeit Grotesk Bold, sans-serif',
  },
  space: {
    navHeightDesktop: '60px',
    navHeightMobile: '110px',
  },
  transitions: {
    duration: '0.2s',
  },
  radii: {
    borderRadius: '8px',
  },
})

const globalStyles = globalCss({
  '*': {
    fontFamily: '$body',
  },
  'html, body': {
    margin: '0',
    padding: '0',
    WebkitFontSmoothing: 'antialiased',
    background: '$background',
  },
  kbd: {
    color: '$background',
    background: '$grey',
    padding: '1px 5px',
    borderRadius: '4px',
    transition: 'background $duration ease-in-out',
    fontFamily: '$code',
    fontSize: '14px',
  },
  figure: {
    margin: 0,
  },
  twitterwidget: {
    margin: '0 auto',
  },
  code: {
    background: '#151417',
    borderRadius: '$borderRadius',
    color: '$primary',
    fontFamily: '$code',
    fontSize: '15px',
  },
  ':not(pre) > code': {
    padding: '4px',
  },
  h1: {
    fontFamily: '$heading',
    fontSize: '48px',
    lineHeight: '50px',
    margin: '0 0 20px',
    color: '$primary',
  },
  h2: {
    color: '$primary',
    margin: '60px 0 0',
    fontSize: '24px',
  },
  'h3, h3 a': {
    color: '$primary',
    fontSize: '18px',
    margin: '20px 0 0',
  },
  ul: {
    margin: 0,
  },
  img: {
    borderRadius: '8px',
    minWidth: '100%',
    maxWidth: '100%',
  },
  p: {
    margin: '20px 0',
    color: '$grey',
  },
  strong: {
    color: '$primary',
    fontWeight: 500,
  },
  blockquote: {
    borderLeft: '4px solid $hover',
    color: '$grey',
    fontStyle: 'italic',
    margin: '0',
    paddingLeft: '20px',
  },
  a: {
    borderBottom: '.5px solid $grey',
    color: '$primary',
    textDecoration: 'none',
    transition: 'opacity $duration ease-in-out',
  },
  'a:hover, a:focus': {
    opacity: '0.8',
  },
  '@font-face': [
    {
      fontFamily: 'Neuzeit Grotesk Bold',
      src: `url("/static/fonts/NeuzeitGrotesk-Bold.woff2") format("woff2"),
        url("/static/fonts/NeuzeitGrotesk-Bold.woff") format("woff")`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Biotif',
      src: `url("/static/fonts/Biotif-Bold.woff2") format("woff2"),
        url("/static/fonts/Biotif-Bold.woff") format("woff")`,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Biotif',
      src: `url("/static/fonts/Biotif-Book.woff2") format("woff2"),
        url("/static/fonts/Biotif-Book.woff") format("woff")`,
      fontWeight: 500,
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Biotif',
      src: `url("/static/fonts/Biotif-Regular.woff2") format("woff2"),
        url("/static/fonts/Biotif-Regular.woff") format("woff")`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Biotif',
      src: `url("/static/fonts/Biotif-RegularItalic.woff2") format("woff2"),
        url("/static/fonts/Biotif-RegularItalic.woff") format("woff")`,
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
})

globalStyles()
