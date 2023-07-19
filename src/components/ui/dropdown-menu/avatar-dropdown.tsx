import { FC } from 'react'

import s from './dropdown-menu.module.scss'

import { LogoutIcon, ProfileIcon } from '@/assets'
import { Avatar, DropdownMenu, Typography } from '@/components'
import { MenuItem } from '@/components/ui/dropdown-menu/menu-item/menu-item.tsx'

type AvtarDropdownPropsType = {
  userName?: string
  userEmail?: string
  avatar?: string
  onSignOut: () => void
}

export const AvatarDropdown: FC<AvtarDropdownPropsType> = props => {
  const { avatar, userName, userEmail, onSignOut } = props

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <DropdownMenu
        trigger={
          <button className={s.icon_button}>
            {<Avatar src={avatar} userName={userName} showLabel />}
          </button>
        }
      >
        <MenuItem>
          <>
            <Avatar src={avatar} menuItem={s.menu_item} userName={userName} />
            <div style={{ flexDirection: 'column' }}>
              <Typography variant={'caption'}>
                <div>{userName}</div>
                <div>{userEmail}</div>
              </Typography>
            </div>
          </>
        </MenuItem>
        <MenuItem as={'a'} href={'#'}>
          <ProfileIcon />
          <Typography variant={'caption'}>My Profile</Typography>
        </MenuItem>
        <MenuItem separator={false} onSelect={onSignOut}>
          <LogoutIcon />
          <Typography variant={'caption'}>Sign Out</Typography>
        </MenuItem>
      </DropdownMenu>
    </div>
  )
}
