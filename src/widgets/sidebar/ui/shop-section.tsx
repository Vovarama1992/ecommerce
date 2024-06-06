import { NavLink } from 'react-router-dom'

import { useGetUserShopsQuery } from '@/entities/shop'
import { CreateShopButton } from '@/features/shop/create-shop'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { cn } from '@/shared/lib/tailwind'
import { Typography } from '@/shared/ui/typography'

import { ShopAccordion } from './shop-accordion'

export const ShopSection = () => {
  const { data: shops } = useGetUserShopsQuery()

  if (shops?.length === 0) {
    return (
      <div className={'flex flex-col justify-center'}>
        <h4 className={'text-sm font-medium'}>Магазин</h4>
        <CreateShopButton className={'w-full'} variant={'secondary'} />
      </div>
    )
  }

  return (
    <ul>
      <li className={'py-[4px]'}>
        <Typography className={'font-bold flex items-center'}>Магазин</Typography>
      </li>
      {shops?.map(shop => (
        <li className={'py-[4px]'} key={shop.id}>
          <ShopAccordion shop={shop} />
        </li>
      ))}
      <li className={'py-[4px] h-[28px] flex items-center'}>
        <Typography className={'text-sm font-bold'}>Списки</Typography>
      </li>
      {shops?.map(shop => (
        <li className={'py-[4px] h-[28px] flex items-center '} key={shop.id}>
          <NavLink
            className={({ isActive }) =>
              cn('text-sm hover:underline w-full', isActive && 'text-blue-600')
            }
            to={ROUTER_PATHS.OFFICE_CONNECTIONS(shop.id)}
          >
            {shop.name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
