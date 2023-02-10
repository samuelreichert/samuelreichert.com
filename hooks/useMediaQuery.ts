import { useState, useEffect } from 'react'
import { config } from '../stitches.config'

type MediaKeys = keyof typeof config.media
type QueryType = typeof config.media[MediaKeys]

export const useMediaQuery = (query: QueryType) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}
