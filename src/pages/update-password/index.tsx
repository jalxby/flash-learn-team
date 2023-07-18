import { useNavigate, useParams } from 'react-router-dom'

import { CreateNewPassword, Page } from '@/components'
import { RegistrationForm } from '@/components/auth'
import { useResetPasswordMutation, useSignUpMutation } from '@/services/auth/auth.api.ts'
import { ArgsSignUpType } from '@/services/auth/auth.api.types.ts'
type Params = {
  token: string
}
export const UpdatePasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const { token } = useParams<Params>()
  const onSubmitForm = async (password: string) => {
    if (token) resetPassword({ password, token })
  }

  return (
    <Page>
      <CreateNewPassword onSubmit={onSubmitForm} />
    </Page>
  )
}
