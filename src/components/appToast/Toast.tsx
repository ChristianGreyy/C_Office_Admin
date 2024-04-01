import { ToastContainer, ToastContainerProps } from 'react-toastify'

export const AppToast = (props: ToastContainerProps) => {
  return <ToastContainer {...props} style={{ fontSize: '1rem' }} />
}
