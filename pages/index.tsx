import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '../components/Navbar'
// import ShortcutHome from '../components/ShortcutHome'
import { PostContainer, PostContent, PostMain } from '../components/Post'
import { Footer } from '../components/Footer'
import { Wrapper } from '../components/Wrapper'
import { styled } from '../stitches.config'

const inter = Inter({ subsets: ['latin'] })

type IndexProps = {
  title: string
  description: string
  image?: string
}

export async function getStaticProps(): Promise<{ props: IndexProps }> {
  return {
    props: {
      title: 'Samuel Reichert',
      description:
        'Passionated about Javascript, Games, Series, doing workout occasionally',
      image: '/static/images/home-bw.jpg',
    },
  }
}

export default function Index(props: IndexProps) {
  const { title, description } = props

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        {/* <meta content="https://samuelreichert.com" property="og:url" /> */}
        {/* <meta content={`https://zenorocha.com${image}`} property="og:image" /> */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Home>
        <PostContent>
          <PostContainer>
            <div>
              <h1>{title}</h1>
              <p>
                <strong>
                  Frontend developer at{' '}
                  <a href="https://passionatepeople.io/" target="blank">
                    Passionate People
                  </a>
                </strong>
                <br />
                {description}
              </p>
            </div>
          </PostContainer>
        </PostContent>
      </Home>

      <Footer />
    </Wrapper>
  )
}

const Home = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
})
