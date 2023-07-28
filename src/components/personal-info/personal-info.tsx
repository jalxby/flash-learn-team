import { FC, useEffect } from 'react'

import { useForm } from 'react-hook-form'

import s from './personal-info.module.scss'

import { LogoutIcon, PencilIcon } from '@/assets'
import { Avatar, Button, Typography } from '@/components'
import { useImageUploader } from '@/components/ui/avatar/useImageUploader.ts'
import { Card } from '@/components/ui/card'
import { EditableText, useEditableText } from '@/components/ui/editeble-text'
import { useGetMeQuery, useUpdateMeMutation } from '@/services/auth'

export type PersonalInfoPropsType = {
  userName?: string
  userEmail?: string
  onLogout: () => void
  onSaveChanges: (value: string | undefined) => void
}

export const PersonalInfo: FC<PersonalInfoPropsType> = props => {
  const { userName, userEmail, onLogout, onSaveChanges } = props
  const { activateEditMode, setEditMode, editMode } = useEditableText('')
  const { file, handleFileChange, openFileInput, fileInputRef } = useImageUploader('')
  const [updateAvatar] = useUpdateMeMutation()
  const { data: me } = useGetMeQuery()
  const {} = useForm()

  useEffect(() => {
    const form = new FormData()

    console.log(file)
    form.append('avatar', file)
    form.append('name', userName ?? '')
    form.append('email', userEmail ?? '')
    updateAvatar(form)
  }, [file])
  console.log(me)

  return (
    <Card className={`${s.card} ${editMode && s.editMode}`}>
      <Typography variant="large" as={'h1'} className={s.title}>
        Personal Information
      </Typography>
      <Avatar src={me?.avatar} size={'6rem'} />
      {!editMode ? (
        <>
          <div className={s.edit_avtar}>
            <input
              type="file"
              className={s.reset_input}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <PencilIcon onClick={openFileInput} style={{ cursor: 'pointer' }} />
          </div>
          <div className={s.userName_container}>
            <Typography as={'h1'} variant={'h1'}>
              {userName}
            </Typography>
            <PencilIcon onClick={activateEditMode} style={{ cursor: 'pointer' }} />
          </div>
          <Typography variant="body2" className={s.email}>
            {userEmail}
          </Typography>

          <Button variant={'secondary'} className={s.btn} onClick={onLogout}>
            <LogoutIcon />
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        </>
      ) : (
        <EditableText
          callback={setEditMode}
          text={userName}
          onSaveChanges={value => {
            onSaveChanges(value)
          }}
        />
      )}
    </Card>
  )
}
