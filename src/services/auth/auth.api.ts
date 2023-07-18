import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  ArgRefreshMeType,
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
      recoverPassword: build.mutation<void, string>({
        query: email => {
          return {
            method: 'POST',
            url: 'auth/recover-password',
            body: { email },
          }
        },
      }),
      resetPassword: build.mutation<any, { password: string; token: string }>({
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

export const { util, useSignOutMutation, useMeQuery, useSignUpMutation, useSignInMutation } =
  authAPI
