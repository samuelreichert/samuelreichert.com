import { AlertCircle, CheckCircle } from 'lucide-react'
import { FC, ReactElement } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import {
  Close,
  Description,
  IconContainer,
  Root,
  Title,
  Viewport,
} from './styles'

type ToastProps = {
  children?: ReactElement
  description: string
  isSuccess: boolean
  setShowToast: (toast: boolean) => void
  showToast: boolean
  title: string
}

export const Toast: FC<ToastProps> = ({
  children,
  description,
  isSuccess,
  setShowToast,
  showToast,
  title,
}) => {
  const iconColor = isSuccess ? '#4cb782' : '#b75c4c'
  const Icon = isSuccess ? CheckCircle : AlertCircle

  return (
    <ToastPrimitive.Provider>
      {children}
      <Root open={showToast} onOpenChange={setShowToast}>
        <IconContainer style={{ color: iconColor }}>
          <Icon size={24} />
        </IconContainer>
        <div>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
        <Close aria-label="Close">
          <span aria-hidden>×</span>
        </Close>
      </Root>
      <Viewport />
    </ToastPrimitive.Provider>
  )
}
