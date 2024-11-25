import { toast } from 'react-toastify'

export const notify = (type, message) => {
  switch (type) {
    case 'success':
      return toast.success(message)

    case 'warning':
      return toast.warning(message)

    case 'error':
      return toast.error(message)

    default:
      break
  }
}
