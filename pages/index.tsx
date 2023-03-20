import Head from 'next/head'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import { PostContainer, PostContent, PostMain } from '../components/Post'
import { Wrapper } from '../components/Wrapper'
import { GradientTitle } from '../layouts/Base'
import { styled } from '../stitches.config'

type IndexProps = {
  title: string
  description: string
  image?: string
  primaryColor?: string
  secondaryColor?: string
}

export async function getStaticProps(): Promise<{ props: IndexProps }> {
  return {
    props: {
      title: 'Samuel Reichert',
      description:
        'Passionated about Web, Typescript, Javascript, Games, Series, doing workout occasionally',
      image: '/static/images/home-bw.jpg',
      primaryColor: 'cyan',
      secondaryColor: 'green',
    },
  }
}

export default function Index(props: IndexProps) {
  const { title, description, image, primaryColor, secondaryColor } = props

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="https://samuelreichert.com" property="og:url" />
        <meta
          content={`https://samuelreichert.com${image}`}
          property="og:image"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Home>
        <PostContent>
          <PostContainer>
            <div>
              {/* <h1>{title}</h1> */}
              <GradientTitle
                css={{
                  backgroundImage: `linear-gradient(
									135deg,
									$${primaryColor} 0%,
									$${secondaryColor} 100%
								);`,
                }}
              >
                {title}
              </GradientTitle>
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
