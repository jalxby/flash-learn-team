import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { RootState } from '@/app/store.ts'
import {
  ArgRecoverPasswordType,
  ArgRefreshMeType,
  ArgResetPasswordType,
  ArgsSignInType,
  ArgsSignUpType,
  SignInResponseType,
  UserType,
} from '@/services/auth/auth.api.types.ts'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es/v1/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Me'],
  endpoints: build => {
    return {
      me: build.query<UserType, void>({
        query: () => {
          return {
            method: 'GET',
            url: 'auth/me',
            params: {},
          }
        },
        providesTags: ['Me'],
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
            url: `auth/reset-password/${token}`,
            body: { password },
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
} = api
