import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import CommandBar from '../components/CommandBar'
import { lightTheme } from '../stitches.config'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        dark: 'dark',
        light: lightTheme.className,
      }}
    >
      <CommandBar>{getLayout(<Component {...pageProps} />)}</CommandBar>
    </ThemeProvider>
  )
}
