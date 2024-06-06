import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './base-query-with-reauth'
import {
  CONNECTION_TAG,
  CONNECTIONS_TAG,
  SESSION_TAG,
  SHOP_TAG,
  WILDBERRIES_STOCKS_TAG,
} from './tags'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: [SESSION_TAG, SHOP_TAG, CONNECTION_TAG, CONNECTIONS_TAG, WILDBERRIES_STOCKS_TAG],
})
