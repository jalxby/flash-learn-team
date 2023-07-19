import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/app/store.ts'
import { UserType } from '@/services/auth/auth.api.types.ts'

type AuthState = {
  user: UserType | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
  },
})

export const { setCredentials } = slice.actions

export const authReducer = slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth
