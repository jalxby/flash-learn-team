import { Outlet } from 'react-router-dom'

import { Header } from '@/components/layout/header'

export const Layout = () => {
  return (
    <div>
      <Header>{'wtf children?'}</Header>
      <Outlet />
    </div>
  )
}
