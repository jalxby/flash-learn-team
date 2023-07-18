import { FC } from 'react'

import { clsx } from 'clsx'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import s from './header.module.scss'

import { Logo } from '@/assets'
import { AvatarDropdown, Button } from '@/components'
import { UserType } from '@/services/auth/auth.api.types.ts'

export type Props = {
  userData?: UserType
  onSignOut: () => void
}
export const Header: FC<Props> = ({ onSignOut, userData }) => {
  const cNames = {
    header: clsx(s.header),
    container: clsx(s.container, 'container'),
  }

  console.log(userData)

  return (
    <header className={cNames.header}>
      <div className={cNames.container}>
        <Link to={'/'}>
          <Logo />
        </Link>
        {!userData && (
          <Button as={'a'} href={'sign-in'}>
            Sign In
          </Button>
        )}
        {userData && (
          <AvatarDropdown
            onSignOut={onSignOut}
            userEmail={userData.email}
            userName={userData.name}
          />
        )}
      </div>
    </header>
  )
}
