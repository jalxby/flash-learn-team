import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Header } from '@/components/layout/header'
import { useMeQuery, useSignOutMutation } from '@/services/auth'

export const Layout = () => {
  const { data, isLoading } = useMeQuery()
  const [signOut] = useSignOutMutation()

  console.log(data)
  const onSignOut = () => {
    signOut()
      .unwrap()
      .then(() => {})
      .catch(error => {
        toast(error)
      })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <Header userData={data} onSignOut={onSignOut} />
      <Outlet />
    </div>
  )
}
