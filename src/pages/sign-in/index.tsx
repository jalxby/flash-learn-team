import { useNavigate } from 'react-router-dom'

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
        navigate('/packs')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Page>
      <LoginForm onSubmit={onSubmit} />
    </Page>
  )
}
