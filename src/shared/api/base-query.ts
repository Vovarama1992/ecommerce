import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    // more headers
    return headers
  },
})
