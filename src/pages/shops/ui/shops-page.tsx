import { Link, useSearchParams } from 'react-router-dom'

import { CreateShopButton } from '@/features/shop/create-shop'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { Typography } from '@/shared/ui/typography'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui-shad-cn/ui/breadcrumb'
import { Card, CardHeader } from '@/shared/ui-shad-cn/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui-shad-cn/ui/tabs'

import { ShopListTable } from './shop-list-table'

const PARAMS = {
  SHOW: 'show',
}

const DEFAULT_SHOW_SHOPS = 'all'

export const ShopsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const showShops = searchParams.get(PARAMS.SHOW) ?? DEFAULT_SHOW_SHOPS

  const onTabChange = (newValue: string) => {
    if (newValue === DEFAULT_SHOW_SHOPS) {
      searchParams.delete(PARAMS.SHOW)
    } else {
      searchParams.set(PARAMS.SHOW, newValue)
    }

    setSearchParams(searchParams)
  }

  return (
    <div className={'mt-6'}>
      <div className={'flex justify-between items-center mb-5'}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={ROUTER_PATHS.OFFICE}>Офис</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={ROUTER_PATHS.SHOPS()}>Магазины</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Список магазинов</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className={'flex gap-5'}>
          <Tabs onValueChange={onTabChange} value={showShops}>
            <TabsList>
              <TabsTrigger value={'all'}>Все</TabsTrigger>
              <TabsTrigger value={'my'}>Мои</TabsTrigger>
              <TabsTrigger value={'thirdParty'}>Сторонние</TabsTrigger>
            </TabsList>
          </Tabs>

          <CreateShopButton />
        </div>
      </div>

      <section>
        <CardHeader>
          <Typography variant={'h2'}>Магазины</Typography>
        </CardHeader>
        <Card>
          <ShopListTable />
        </Card>
      </section>
    </div>
  )
}
