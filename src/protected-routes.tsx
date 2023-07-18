import { FC, PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { useMeQuery } from '@/services/auth'
type Props = PropsWithChildren<{ navigateTo: string }>
export const ProtectedRoutes: FC<Props> = ({ children, navigateTo }) => {
  const { data } = useMeQuery()

  console.warn(data)

  return data ? <>{children}</> : <Navigate to={navigateTo} />
}
