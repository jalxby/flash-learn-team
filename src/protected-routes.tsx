import { FC, PropsWithChildren } from 'react'

import { useNavigate } from 'react-router-dom'

import { useMeQuery } from '@/services/auth'

type Props = PropsWithChildren
export const ProtectedRoutes: FC<Props> = ({ children }) => {
  const { data, isLoading, error } = useMeQuery()

  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>
  if (error || !data) navigate('/sign-in')

  return <>{children}</>
}
