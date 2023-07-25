import { FC } from 'react'

import s from './editable-text.module.scss'

import { Button, TextField } from '@/components'
import { useEditableText } from '@/components/ui/editeble-text/useEditableText.ts'

export type EditableTextPropsType = {
  text: string | undefined
  callback: (value: boolean) => void
  onSaveChanges: (newValue: string | undefined) => void
}
export const EditableText: FC<EditableTextPropsType> = props => {
  const { text, callback, onSaveChanges } = props

  const { disableEditMode, error, value, handleInputChange } = useEditableText(text && text)
  const disableEditModeHandler = () => {
    disableEditMode()
    callback(false)
    onSaveChanges(value)
  }

  return (
    <>
      <TextField
        title={'Nickmame'}
        inputType={'text'}
        value={value}
        onChange={handleInputChange}
        error={error}
        autoFocus
      />
      <Button
        variant={'primary'}
        fullWidth={true}
        onClick={disableEditModeHandler}
        className={s.btn}
      >
        Save Changes
      </Button>
      {error && <span className={s.error}>{}</span>}
    </>
  )
}
