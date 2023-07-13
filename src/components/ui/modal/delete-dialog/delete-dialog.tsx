import { FC, ReactNode, useState } from 'react'

import { Button, Typography } from '@/components'
import { Modal } from '@/components/ui/modal'

export type ItemType = PackItemType | CardItemType
type PackItemType = {
  id: string
  title: string
}
//TODO change this mock types to types from backend
type CardItemType = {
  id: string
  title: string
}

type DeleteDialogProps = {
  title: string
  item: ItemType
  buttonTitle: string
  trigger: ReactNode
  onClick: (id: string) => void
}
export const DeleteDialog: FC<DeleteDialogProps> = ({
  onClick,
  trigger,
  title,
  item,
  buttonTitle,
}) => {
  //TODO body message should warn about deleting all cards if item = Pack
  const bodyMessage = `Do you really want to delete ${item.title}`

  const [open, setOpen] = useState<boolean>(false)
  const clickHandler = () => {
    onClick(item.id)
    setOpen(false)
  }

  return (
    <div>
      <Modal
        onOpenChange={setOpen}
        trigger={trigger}
        isOpen={open}
        title={title}
        body={bodyMessage}
        footer={
          <>
            <Button variant={'primary'} onClick={clickHandler}>
              <Typography variant={'subtitle2'}>{buttonTitle}</Typography>
            </Button>

            <Button variant={'secondary'} onClick={() => setOpen(false)}>
              <Typography variant={'subtitle2'}>Cancel</Typography>
            </Button>
          </>
        }
      />
    </div>
  )
}
