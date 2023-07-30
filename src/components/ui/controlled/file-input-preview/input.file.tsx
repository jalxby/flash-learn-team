import { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import mask from '@/assets/images/mask.png'
import { Button } from '@/components'

type PropsType<T extends FieldValues> = { withPreview: boolean } & Omit<
  ComponentProps<'input'>,
  'onChange' | 'value' | 'type'
> &
  Omit<UseControllerProps<T>, 'rules' | 'defaultValues'>
export const ControlledFileInput = <T extends FieldValues>({
  control,
  name,
  withPreview,
  ...rest
}: PropsType<T>) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const refToOpen = useRef<HTMLInputElement | null>(null)
  const {
    field: { onChange, ...field },
  } = useController({ name, control })

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    setSelectedFile(e.target.files[0])
    onChange(e.target.files)
  }

  const onClick = () => {
    if (refToOpen) {
      refToOpen.current?.click()
    }
  }

  return (
    <>
      {/*{withPreview && <img src={`${value ? value : mask}`} alt="img_preview" />}*/}
      <input type="file" {...rest} onChange={onSelectFile} {...field} />
      <Button type={'button'} onClick={onClick}>
        with ref
      </Button>
    </>
  )
}
