// interfaces
// import type { ToastProps } from '@/interfaces/Toast'

// styles
import { useToast, useColorMode, type ToastPosition } from '@chakra-ui/react'

type ToastStatus = 'success' | 'error' | 'warning' | 'info' | 'loading'
interface ToastProps {
  title: string
  description: string
  status?: ToastStatus
  variant?: string
  position?: ToastPosition
  duration?: number
  isClosable?: boolean
}
interface NotificationProps {
  showToast: (props: ToastProps) => void
  showErrorToast: (props: ToastProps) => void
}

const Toast = (): NotificationProps => {
  const toast = useToast()

  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const showToast = ({
    title = '',
    description = '',
    status = 'success',
    variant = isDark ? 'solid' : 'left-accent',
    position = 'top',
    duration = 6000,
    isClosable = true
  }: ToastProps): void => {
    toast({
      title,
      description,
      status,
      variant,
      position,
      duration,
      isClosable
    })
  }

  const showErrorToast = ({ title = 'Error Interno', description = 'Ocurrió un error, vuelva a intentarlo más tarde.' }: ToastProps): void => {
    showToast({
      title,
      description,
      status: 'error'
    })
  }

  return { showToast, showErrorToast }
}

export default Toast
