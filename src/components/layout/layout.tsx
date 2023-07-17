import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Header } from '@/components/layout/header'
import { useMeQuery, useSignOutMutation } from '@/services/auth'

export const Layout = () => {
  const { data, isLoading, isError, error } = useMeQuery()
  const [signOut] = useSignOutMutation()
  const navigate = useNavigate()
  const location = useLocation()

  console.log(isError)
  console.log(location.pathname)
  console.log('error', error)
  if (isLoading) return <div>Loading...</div>
  if (isError && location.pathname !== '/sign-in') navigate('/sign-in')

  return (
    <div>
      <Header userData={data} onSignOut={signOut} />
      <Outlet />
    </div>
  )
}
