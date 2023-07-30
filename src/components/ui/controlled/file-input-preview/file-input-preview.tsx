import { ChangeEvent, ComponentProps, forwardRef, Ref, useState } from 'react'

import { clsx } from 'clsx'
import { UseFormSetValue } from 'react-hook-form'

import mask from '../../../../assets/images/mask.png'

import s from './file-input-preview.module.scss'

type Props = {
  variant?: 'small' | 'large' | 'medium'
  file?: string
  formSetValue: UseFormSetValue<any>
  ref?: Ref<HTMLInputElement>
  withPreview?: boolean
} & Omit<ComponentProps<'input'>, 'type'>

export const FileInputPreview = forwardRef<HTMLInputElement, Props>(
  ({ variant, formSetValue, withPreview = false, file, ...rest }, ref) => {
    const [selectedFile, setSelectedFile] = useState<File>()
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
      formSetValue('cover', e.target.files[0])
    }

    return (
      <div>
        {/*{withPreview && (*/}
        {/*  <div*/}
        {/*    className={cNames.size}*/}
        {/*    style={{*/}
        {/*      backgroundImage: `url(${selectedFile ? URL.createObjectURL(selectedFile) : mask})`,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
        <input
          id={'fileInput'}
          className={cNames.input}
          type="file"
          {...rest}
          onChange={onSelectFile}
          ref={ref}
        />
      </div>
    )
  }
)
