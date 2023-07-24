import { Page, PersonalInfo } from '@/components'
import { useGetMeQuery, useSignOutMutation, useUpdateMeMutation } from '@/services/auth'

export const Profile = () => {
  const { data: me } = useGetMeQuery()
  const [signOut] = useSignOutMutation()
  const [updateMe] = useUpdateMeMutation()

  const onSaveChanges = (value: string | undefined) => {
    if (me) {
      updateMe({ name: value ? value : '', email: me.email })
    }
  }

  return (
    <Page>
      <PersonalInfo
        userName={me?.name}
        userEmail={me?.email}
        onLogout={signOut}
        onSaveChanges={onSaveChanges}
      />
    </Page>
  )
}
