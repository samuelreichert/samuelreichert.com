import { FC, forwardRef } from 'react'
import { Action } from 'kbar'
import { Box } from '../Box'
import { Action as ActionDiv, ActionRow, Kbd, Shortcut } from './styles'

type ResultItemProps = {
  action: Action
  active: boolean
}

export const ResultItem = forwardRef<HTMLInputElement, ResultItemProps>(
  ({ action, active }, ref) => {
    return (
      <Box ref={ref} css={getResultStyle(active)}>
        <ActionDiv>
          {action.icon && action.icon}
          <ActionRow>
            <span>{action.name}</span>
          </ActionRow>
        </ActionDiv>
        {action.shortcut?.length ? (
          <Shortcut aria-hidden>
            {action.shortcut.map(shortcut => (
              <Kbd key={shortcut}>{shortcut}</Kbd>
            ))}
          </Shortcut>
        ) : null}
      </Box>
    )
  }
)

ResultItem.displayName = 'ResultItem'

const getResultStyle = (active: boolean) => {
  return {
    padding: '12px 16px',
    background: active ? 'rgba(255, 255, 255, 0.1)' : '$command',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    cursor: 'pointer',
    color: active ? '$primary' : '$resultText',
  }
}
