import { ChangeEvent, ComponentProps, ReactNode, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import mask from '@/assets/images/mask.png'
import s from '@/components/ui/controlled/file-input-preview/file-input-preview.module.scss'

type PropsType<T extends FieldValues> = {
  withPreview: boolean
  variant?: 'small' | 'large' | 'medium'
  children?: (onClick: () => void) => ReactNode
} & Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'type'> &
  Omit<UseControllerProps<T>, 'rules' | 'defaultValues'>
export const ControlledFileInput = <T extends FieldValues>({
  control,
  name,
  withPreview,
  variant,
  children,
  ...rest
}: PropsType<T>) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const refToOpen = useRef<HTMLInputElement | null>(null)
  const {
    field: { onChange, value, ref, ...field },
  } = useController({ name, control })
  const cNames = {
    size: clsx(`${s[variant ?? '']}`),
    input: clsx(s.fileInput),
  }
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)

      return
    }

    setSelectedFile(e.target.files[0])
    onChange(e?.target?.files[0] as any)
  }

  const onClick = () => {
    if (refToOpen) {
      refToOpen.current?.click()
    }
  }

  return (
    <>
      {withPreview && (
        <img
          className={cNames.size}
          src={`${selectedFile ? URL.createObjectURL(selectedFile) : mask}`}
          alt="img_preview"
        />
      )}
      <input
        className={cNames.input}
        type="file"
        ref={e => {
          ref(e)
          refToOpen.current = e
        }}
        {...rest}
        onChange={onSelectFile}
        {...field}
      />

      {children && children(onClick)}
    </>
  )
}
