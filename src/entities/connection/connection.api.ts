import type {
  AccessAvitoDto,
  AccessOzonDto,
  AccessWildberriesDto,
  AfterAccessDto,
  CommonAccessDto,
  ConnectionDto,
} from './connection.types'

<<<<<<< HEAD
import { CONNECTION_TAG, SHOP_TAG, baseApi } from '@/shared/api'
=======
import { CONNECTION_TAG, CONNECTIONS_TAG, baseApi } from '@/shared/api'

import { ShopConnectionListDto } from './connection.types'
>>>>>>> 990f61757518c50d96555576d97ebd97b2d7c160

/* eslint-disable perfectionist/sort-objects */
const connectionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getConnections: builder.query<ConnectionDto[], void>({
      providesTags: [CONNECTION_TAG],
      query: () => ({
        url: '/connections/handling/connections_list',
      }),
    }),
    accessToConnection: builder.mutation<AfterAccessDto, CommonAccessDto>({
      invalidatesTags: (_, error) => (!error ? [CONNECTION_TAG, SHOP_TAG] : []),
      query: ({ connection, ...data }) => ({
        body: { connection, ...data },
        method: 'POST',
        url: `/connections/handling/access_to_connection/${connection}`,
      }),
    }),
    getShopConnectionsList: builder.query<ShopConnectionListDto[], { shopId: string }>({
      providesTags: [CONNECTIONS_TAG],
      query: ({ shopId }) => ({
        url: `/connections/handling/shop_connections_list/${shopId}`,
      }),
    }),
    accessWildberries: builder.mutation<AccessWildberriesDto, AccessWildberriesDto>({
      invalidatesTags: (_, error) => (!error ? [CONNECTION_TAG] : []),
      query: body => ({
        body,
        method: 'POST',
        url: '/connections/wildberries/access_to_wildberries/',
      }),
    }),

    accessAvito: builder.mutation<AccessAvitoDto, AccessAvitoDto>({
      invalidatesTags: (_, error) => (!error ? [CONNECTION_TAG] : []),
      query: body => ({
        body,
        method: 'POST',
        url: '/connections/avito/access_to_avito/',
      }),
    }),

    accessOzon: builder.mutation<AccessOzonDto, AccessOzonDto>({
      invalidatesTags: (_, error) => (!error ? [CONNECTION_TAG] : []),
      query: body => ({
        body,
        method: 'POST',
        url: '/connections/ozon/access_to_ozon/',
      }),
    }),
  }),
})

export const {
  endpoints: connectionEndpoints,
  util: connectionUtil,
  useGetConnectionsQuery,
  useAccessToConnectionMutation,
  useAccessWildberriesMutation,
  useAccessAvitoMutation,
  useAccessOzonMutation,
  useGetShopConnectionsListQuery,
} = connectionApi
