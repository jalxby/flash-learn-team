import { FC, ReactNode, useState } from 'react'

import { Button, Typography } from '@/components'
import { Modal } from '@/components/ui/modal'

type DeleteDialogProps = {
  id: string
  title: string
  bodyMessage: string
  buttonTitle: string
  children: ReactNode
  onClick: (id: string) => void
}
export const DeleteDeckDialog: FC<DeleteDialogProps> = ({
  onClick,
  children,
  title,
  buttonTitle,
  id,
  bodyMessage,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const clickHandler = () => {
    onClick(id)
    setOpen(false)
  }

  return (
    <div>
      <Modal.Root onOpenChange={setOpen} trigger={children} isOpen={open} title={title}>
        <Modal.Body>{bodyMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant={'primary'} onClick={clickHandler}>
            <Typography variant={'subtitle2'}>{buttonTitle}</Typography>
          </Button>
          <Button variant={'secondary'} onClick={() => setOpen(false)}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </div>
  )
}
