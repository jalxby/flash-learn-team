import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Page } from '@/components'
import { LoginForm } from '@/components/auth'
import { useMeQuery, useSignInMutation } from '@/services/auth/auth.api.ts'
import { ArgsSignInType } from '@/services/auth/auth.api.types.ts'

export const SignIn = () => {
  const [signIn] = useSignInMutation()
  const { data } = useMeQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (!data) return
    navigate('/packs')
  }, [data, navigate])

  const onSubmit = (data: ArgsSignInType) => {
    signIn(data)
      .unwrap()
      .then(() => {
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
