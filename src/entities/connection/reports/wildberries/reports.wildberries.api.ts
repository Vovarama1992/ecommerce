import { WILDBERRIES_STOCKS_TAG, baseApi } from '@/shared/api'

const wildberriesReportsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWildberriesStocks: builder.query<any, string>({
      providesTags: [WILDBERRIES_STOCKS_TAG],
      query: dateFrom => ({
        params: {
          category: 5,
          dateFrom,
          id_access_to_connections: 19,
          type_data: 31,
        },
        url: '/connections/reports/wildberries/stocks',
      }),
    }),
  }),
})

export const {
  endpoints: wildberriesReportsEndpoints,
  useGetWildberriesStocksQuery,
  util: wildberriesReportsUtil,
} = wildberriesReportsApi
