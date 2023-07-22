import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Header } from '@/components/layout/header'
import { useMeQuery, useSignOutMutation } from '@/services/auth'

export const Layout = () => {
  const { data } = useMeQuery()
  const [signOut] = useSignOutMutation()

  const onSignOut = () => {
    signOut()
      .unwrap()
      .then(() => {})
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
