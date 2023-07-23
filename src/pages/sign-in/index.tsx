import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Page } from '@/components'
import { LoginForm } from '@/components/auth'
import { useGetMeQuery, useSignInMutation } from '@/services/auth/auth.api.ts'
import { ArgsSignInType } from '@/services/auth/auth.api.types.ts'

export const SignIn = () => {
  const [signIn] = useSignInMutation()
  const { data: me } = useGetMeQuery()
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

  useEffect(() => {
    if (!me) return

    navigate('/')
  }, [me])

  return (
    <Page>
      <LoginForm onSubmit={onSubmit} />
    </Page>
  )
}
