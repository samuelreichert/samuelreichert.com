// import ErrorMessage from '../components/ErrorMessage'
// import Blogpost from '../layouts/Blogpost'
import { ReactElement } from 'react'
import { Box } from '../components/Box'
import Blogpost from '../layouts/Blogpost'
import type { NextPageWithLayout } from './_app'

const Custom404: NextPageWithLayout = () => {
  return (
    <Box css={{ textAlign: 'center' }}>
      <h1>404</h1>
      {/* <ShortcutError /> */}
      <p>This page doesn't exist.</p>
    </Box>
  )
}

Custom404.getLayout = (page: ReactElement) => {
  return <Blogpost>{page}</Blogpost>
}

export default Custom404
