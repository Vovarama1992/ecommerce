import { useEffect, useState } from 'react'

import { useGetWildberriesStocksQuery } from '@/entities/connection/reports/wildberries/reports.wildberries.api'
import { DataTable } from '@/shared/ui/data-table'

export const StocksPage = () => {
  const [columns, setColumns] = useState([])
  const [startDate, setStartDate] = useState('2024-05-29T03:23:45.029Z')

  const { data } = useGetWildberriesStocksQuery(startDate)

  useEffect(() => {
    setStartDate('2024-05-30T03:23:45.029Z')
    const columnsDataArray = data && data[0] && Object.keys(data[0])
    const columnsData = columnsDataArray
      ? columnsDataArray.map((item: string) => ({
          accessorKey: item,
          header: item,
        }))
      : []

    setColumns(columnsData)
  }, [data])

  return (
    <div>
      <div className={'container mx-auto py-10'}>
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  )
}
