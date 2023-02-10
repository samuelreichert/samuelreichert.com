import { FC, PropsWithChildren, ReactElement } from 'react'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import { Post, PostMain, PostContent, PostContainer } from '../components/Post'
import { Wrapper } from '../components/Wrapper'
import { styled } from '../stitches.config'

type MainProps = PropsWithChildren & {
  image: string
}

const Main: FC<MainProps> = props => {
  return props.image ? (
    <Post>{props.children}</Post>
  ) : (
    <PostMain>{props.children}</PostMain>
  )
}

const Blogpost: FC<{ children: ReactElement }> = ({ children }) => {
  const { title, image, date, views } = children.props

  return (
    <Wrapper>
      <Navbar />
      <Main image={image}>
        {image && (
          <PostHeader>
            <PostHeaderTitle>{title}</PostHeaderTitle>
            <PostImage
              css={image ? { backgroundImage: `url(${image})` } : {}}
            />
            <PostHeaderSubtitle>
              {/* <BlogDate dateString={date} /> */}
              {/* <BlogViews views={views} /> */}
            </PostHeaderSubtitle>
          </PostHeader>
        )}
        <PostContent
          css={{
            '& ::selection': {
              background: '#ff80bf',
              color: '#000',
              WebkitTextFillColor: '#000',
            },
          }}
        >
          <PostContainer>
            {!image && (
              <div>
                <PostContentTitle>{title}</PostContentTitle>
                <PostContentSubtitle>
                  {/* <BlogDate dateString={date} /> */}
                  {/* <BlogViews views={views} /> */}
                </PostContentSubtitle>
              </div>
            )}

            {children}
          </PostContainer>
        </PostContent>
      </Main>
      <Footer />
    </Wrapper>
  )
}

export default Blogpost

const PostHeader = styled('div', {
  backgroundColor: '#141618',
  minHeight: '600px',
  height: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  flexDirection: 'column',
  zIndex: -1,
})

export const PostTitle = styled('h1', {
  textAlign: 'center',
  '@bp2': {
    fontSize: '72px',
    lineHeight: '90px',
    maxWidth: '60%',
  },
})

export const PostHeaderTitle = styled(PostTitle, {
  color: '#fff',
  margin: '59px auto 0',
  position: 'relative',
  zIndex: 3,
  fontSize: '60px',
  lineHeight: '80px',
})

export const PostContentTitle = styled(PostTitle, {
  color: '$primary',
  margin: '90px auto 0',
  maxWidth: 'none',
  fontSize: '48px',
  lineHeight: '60px',
  textAlign: 'center',
  '@bp2': {
    marginTop: 0,
  },
})

const PostSubtitle = styled('h2', {
  color: '#fff',
  fontSize: '16px',
  fontWeight: 500,
  textAlign: 'center',
})

const PostHeaderSubtitle = styled(PostSubtitle, {
  position: 'absolute',
  bottom: '20px',
  zIndex: 2,
  margin: '0',
  width: '100%',
})

const PostContentSubtitle = styled(PostSubtitle, {
  color: '$grey',
  fontSize: '16px',
  margin: '0 0 60px',
})

const PostImage = styled('div', {
  backgroundColor: '#141618',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'fixed',
  opacity: 0.4,
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  zIndex: 1,
  willChange: 'transform',

  '&::after': {
    content: '""',
    backgroundImage: `linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.8) 0,
      transparent 50%,
      transparent 90%,
      rgba(0, 0, 0, 0.8)
    )`,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    zIndex: 2,
    willChange: 'transform',
  },

  '@bp4': { position: 'absolute' },
})
