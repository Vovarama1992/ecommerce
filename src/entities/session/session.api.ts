/* eslint-disable perfectionist/sort-objects */
import type { LoginDto, RegistrationDto, UserDto } from './session.types'

import { SESSION_TAG, baseApi } from '@/shared/api'

const sessionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<UserDto, void>({
      providesTags: [SESSION_TAG],
      query: () => ({
        url: '/auth/me',
      }),
    }),

    signUp: builder.mutation<UserDto, RegistrationDto>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/register',
      }),
    }),

    signIn: builder.mutation<UserDto, LoginDto>({
      invalidatesTags: (_, error) => (!error ? [SESSION_TAG] : []),
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/login',
      }),
    }),

    signOut: builder.mutation<void, void>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/logout',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          dispatch(baseApi.util?.resetApiState())
        } catch (error) {
          return
        }
      },
    }),
  }),
})

export const {
  util: sessionUtil,
  endpoints: sessionEndpoints,
  useMeQuery,
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
} = sessionApi
