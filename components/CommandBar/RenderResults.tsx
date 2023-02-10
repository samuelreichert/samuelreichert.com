import { FC } from 'react'
import { KBarResults, useMatches } from 'kbar'
import { GroupName } from './styles'
import { ResultItem } from './ResultItem'

export const RenderResults: FC = () => {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <GroupName>{item}</GroupName>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  )
}
