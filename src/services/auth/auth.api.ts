import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  ArgRecoverPasswordType,
  ArgRefreshMeType,
  ArgResetPasswordType,
  ArgsSignInType,
  ArgsSignUpType,
  SignInResponseType,
  UserType,
} from '@/services/auth/auth.api.types.ts'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://andri-flashcards-api.onrender.com/v1/',
    credentials: 'include',
  }),
  tagTypes: ['Me'],
  endpoints: build => {
    return {
      me: build.query<UserType | null, void>({
        query: () => {
          return {
            method: 'GET',
            url: 'auth/me',
            params: {},
          }
        },
        providesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled, getCacheEntry }) {
          try {
            const res = await queryFulfilled
            const cacheEntry = getCacheEntry()

            if (JSON.stringify(cacheEntry.data) === JSON.stringify(res.data)) return
            dispatch(
              authAPI.util?.updateQueryData('me', undefined, draft => {
                Object.assign(draft, res.data)
              })
            )
          } catch {
            const cacheEntry = getCacheEntry()

            if (cacheEntry.data === null) return
            dispatch(authAPI.util?.upsertQueryData('me', undefined, null))
          }
        },
      }),
      refreshMe: build.mutation<any, any>({
        query: () => {
          return {
            method: 'GET',
            url: 'auth/refresh-token',
          }
        },
      }),
      updateMe: build.mutation<UserType, ArgRefreshMeType>({
        query: ({ email, password, name }) => {
          return {
            method: 'PATCH',
            url: 'auth/me',
            body: { email, password, name },
          }
        },
      }),
      signUp: build.mutation<UserType, ArgsSignUpType>({
        query: ({ email, password }) => {
          return {
            method: 'POST',
            url: 'auth/sign-up',
            body: { email, password },
          }
        },
      }),
      signIn: build.mutation<SignInResponseType, ArgsSignInType>({
        query: ({ email, password }) => {
          return {
            method: 'POST',
            url: 'auth/login',
            body: { email, password },
          }
        },
        invalidatesTags: ['Me'],
      }),
      verifyEmail: build.mutation<void, string>({
        query: code => {
          return {
            method: 'POST',
            url: 'auth/verify-email',
            body: { code },
          }
        },
      }),
      resendEmail: build.mutation<void, string>({
        query: userId => {
          return {
            method: 'POST',
            url: 'auth/resend-verification-email',
            body: { userId },
          }
        },
      }),
      signOut: build.mutation<void, void>({
        query: () => {
          return {
            method: 'POST',
            url: 'auth/logout',
          }
        },
        invalidatesTags: ['Me'],
      }),
      recoverPassword: build.mutation<void, ArgRecoverPasswordType>({
        query: ({ email, html, subject }) => {
          return {
            method: 'POST',
            url: 'auth/recover-password',
            body: { email, html, subject },
          }
        },
      }),
      resetPassword: build.mutation<any, ArgResetPasswordType>({
        query: ({ password, token }) => {
          return {
            method: 'POST',
            url: 'auth/reset-password',
            body: { password },
            params: { token },
          }
        },
      }),
    }
  },
})

export const {
  useRecoverPasswordMutation,
  util,
  useSignOutMutation,
  useMeQuery,
  useSignUpMutation,
  useSignInMutation,
  useResetPasswordMutation,
} = authAPI