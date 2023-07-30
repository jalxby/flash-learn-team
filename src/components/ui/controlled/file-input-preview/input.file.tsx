import { ChangeEvent, FC, useRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './file-input-preview.module.scss'

import mask from '@/assets/images/mask.png'

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
