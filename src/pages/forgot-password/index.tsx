import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ForgotPassword, Page } from '@/components'
import { useRecoverPasswordMutation } from '@/services/auth'

export const ForgotPasswordPage = () => {
  const [passwordRecovery] = useRecoverPasswordMutation()
  const navigate = useNavigate()
  const onSubmit = (email: string) => {
    passwordRecovery(email)
      .unwrap()
      .then(() => {
        navigate('/check-email', { state: email })
      })
      .catch(error => {
        toast.error(error.data.message)
      })
  }

  return (
    <Page>
      <ForgotPassword onSubmit={onSubmit} />
    </Page>
  )
}
