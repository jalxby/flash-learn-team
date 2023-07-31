import { FC, ReactNode, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { deckSchema } from './create-deck-schema.ts'

import { Button, ControlledCheckbox, ControlledTextField, Typography } from '@/components'
import { ControlledFileInput } from '@/components/ui/controlled/file-input-preview/controlled-file-input.tsx'
import { Modal } from '@/components/ui/modal'

type AddNewPackModalPropsType = {
  trigger: ReactNode
  onSubmit: (data: FormData) => void
}
type Form = z.infer<typeof deckSchema>

export const CreateDeck: FC<AddNewPackModalPropsType> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { trigger, onSubmit } = props
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(deckSchema),
    mode: 'onSubmit',
  })

  if (errors.cover) toast.error(`${errors.cover.message}`)
  const onSubmitForm = handleSubmit(data => {
    const form = new FormData()

    form.append('cover', data.cover)
    form.append('name', data.name)
    form.append('isPrivate', String(data.isPrivate))
    onSubmit(form)

    setIsOpen(false)
  })

  return (
    <Modal.Root title={'Add New Pack'} trigger={trigger} onOpenChange={setIsOpen} isOpen={isOpen}>
      <form onSubmit={onSubmitForm}>
        <Modal.Body>
          <ControlledFileInput withPreview={true} control={control} name={'cover'}>
            {onClick => (
              <Button type={'button'} variant={'secondary'} onClick={onClick}>
                Change cover
              </Button>
            )}
          </ControlledFileInput>
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
