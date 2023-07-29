import { ChangeEvent, FC, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './file-input-preview.module.scss'

import mask from '@/assets/images/mask.png'
import { Button } from '@/components'

type Props = {
  children: (onClick: () => void) => JSX.Element
  onChange: (file: File) => void
  value: File
  withPreview?: boolean
}

export const InputFile: FC<Props> = ({
  withPreview = false,
  children,
  onChange,
  value,
  ...rest
}) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const ref = useRef<HTMLInputElement | null>(null)

  const onClick = () => {
    if (ref) {
      ref.current?.click()
    }
  }
  const cNames = {
    input: clsx(s.fileInput),
  }

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    setSelectedFile(e.target.files[0])
    onChange(e.target.files[0])
  }

  return (
    <>
      {withPreview && (
        <img src={`${selectedFile ? URL.createObjectURL(selectedFile) : mask}`} alt="img_preview" />
      )}
      <input className={cNames.input} type="file" {...rest} onChange={onSelectFile} ref={ref} />
      {children(onClick)}
    </>
  )
}
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const schema = z.object({
  avatar: z
    .any()
    .refine(file => file?.size <= MAX_FILE_SIZE, `Max file-input-preview size is 5MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
})

type Form = z.infer<typeof schema>
const InputFileWithForm = () => {
  const { control, handleSubmit } = useForm<Form>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <InputFile {...field}>
              {(onClick: () => void) => (
                <Button type={'button'} onClick={onClick}>
                  {'test'}
                </Button>
              )}
            </InputFile>
          )}
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default InputFileWithForm
