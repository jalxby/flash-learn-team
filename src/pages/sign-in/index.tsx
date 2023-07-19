import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Page } from '@/components'
import { LoginForm } from '@/components/auth'
import { useSignInMutation } from '@/services/auth/auth.api.ts'
import { ArgsSignInType } from '@/services/auth/auth.api.types.ts'

export const SignIn = () => {
  const [signIn] = useSignInMutation()
  const navigate = useNavigate()

  const onSubmit = (data: ArgsSignInType) => {
    signIn(data)
      .unwrap()
      .then(() => {
        navigate('/')
        toast.success('you are sign in successful')
      })
      .catch(error => {
        toast.error(error.data.message)
      })
  }

  return (
    <Page>
      <LoginForm onSubmit={onSubmit} />
    </Page>
  )
}
