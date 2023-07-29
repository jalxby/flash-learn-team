import { FC, ReactNode, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import mask from '../../../../assets/images/mask.png'

import { createDeckSchema } from './create-deck-schema.ts'

import { ChangeCoverIcon } from '@/assets'
import {
  Button,
  ControlledCheckbox,
  ControlledTextField,
  FileInputPreview,
  Typography,
} from '@/components'
import { Modal } from '@/components/ui/modal'

type AddNewPackModalPropsType = {
  trigger: ReactNode
  onSubmit: (data: FormData) => void
}
type Form = z.infer<typeof createDeckSchema>

export const CreateDeck: FC<AddNewPackModalPropsType> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { trigger, onSubmit } = props
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(createDeckSchema),
    mode: 'onSubmit',
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (errors.cover) toast.error(`${errors.cover.message}`)
  const onSubmitForm = handleSubmit(data => {
    const form = new FormData()

    form.append('cover', data.cover)
    form.append('name', data.name)
    form.append('isPrivate', String(data.isPrivate))
    onSubmit(form)

    setIsOpen(false)
  })
  const handleOpenFileInput = () => {
    if (fileInputRef) {
      fileInputRef.current?.click()
    }
  }

  return (
    <Modal.Root title={'Add New Pack'} trigger={trigger} onOpenChange={setIsOpen} isOpen={isOpen}>
      <form onSubmit={onSubmitForm}>
        <Modal.Body>
          <FileInputPreview
            file={mask}
            variant={'large'}
            formSetValue={setValue}
            ref={fileInputRef}
            withPreview={true}
          />
          <Button type="button" variant={'secondary'} onClick={handleOpenFileInput}>
            <ChangeCoverIcon />
            Change Cover
          </Button>
          <ControlledTextField
            style={{ marginBottom: '1.5rem' }}
            name={'name'}
            control={control}
            title={'Name Pack'}
            inputType={'text'}
          />
          <ControlledCheckbox control={control} name={'isPrivate'} label={'Private pack'} left />
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'primary'} type={'submit'}>
            <Typography variant={'subtitle2'}>Add New Pack</Typography>
          </Button>
          <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
            <Typography variant={'subtitle2'}>Cancel</Typography>
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Root>
  )
}
