import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAppDispatch } from '@/app/hooks.ts'
import { Header } from '@/components/layout/header'
import { useMeQuery, useSignOutMutation, util } from '@/services/auth'

export const Layout = () => {
  const { data } = useMeQuery()
  const [signOut] = useSignOutMutation()
  const dispatch = useAppDispatch()

  const onSignOut = () => {
    signOut()
      .unwrap()
      .then(() => {
        dispatch(util?.resetApiState())
      })
      .catch(error => {
        toast(error)
      })
  }

  return (
    <div>
      <Header userData={data} onSignOut={onSignOut} />
      <Outlet />
    </div>
  )
}
