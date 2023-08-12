import { FC } from 'react'

import { DeleteIcon, LearnPackIcon, PencilIcon } from '@/assets'
import OpenPackMenuIcon from '@/assets/icons/OpenPackMenuIcon.tsx'
import { DropdownMenu, Typography } from '@/components'
import s from '@/components/ui/dropdown-menu/dropdown-menu.module.scss'
import { MenuItem } from '@/components/ui/dropdown-menu/menu-item/menu-item.tsx'
import { EditDeckModal } from '@/components/ui/modal/edit-pack-modal/edit-deck-modal.tsx'

type DeckEditMenuPropsType = {
  onEdit: () => void
  onDelete: () => void
}

export const DeckEditMenu: FC<DeckEditMenuPropsType> = props => {
  const { onDelete, onEdit } = props

  return (
    <DropdownMenu trigger={<button className={s.icon_button}>{<OpenPackMenuIcon />}</button>}>
      <MenuItem as={'a'} href={'#'}>
        <LearnPackIcon />
        <Typography variant={'caption'}>Learn</Typography>
      </MenuItem>
      <EditDeckModal
        trigger={
          <MenuItem onSelect={onEdit}>
            <PencilIcon />
            <Typography variant={'caption'}>Edit</Typography>
          </MenuItem>
        }
        isPrivate={false}
        packName={'Name'}
        onSubmit={() => {}}
        cover={''}
        isOpenEditDeck={false}
        setIsOpenEditDeck={() => {}}
      />
      <MenuItem separator={false} onSelect={onDelete}>
        <DeleteIcon />
        <Typography variant={'caption'}>Delete</Typography>
      </MenuItem>
    </DropdownMenu>
  )
}
