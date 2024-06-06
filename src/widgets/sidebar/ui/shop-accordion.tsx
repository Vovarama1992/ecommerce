import type { ShopDto } from '@/entities/shop'

import { useState } from 'react'

import { useGetShopConnectionsListQuery } from '@/entities/connection'
import { AccessConnectionForm } from '@/features/connection/connection-access'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui-shad-cn/ui/accordion'
import { Button } from '@/shared/ui-shad-cn/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui-shad-cn/ui/sheet'

type ShopAccordionProps = { shop: ShopDto }

export const ShopAccordion = ({ shop }: ShopAccordionProps) => {
  const { data: shopList } = useGetShopConnectionsListQuery({ shopId: shop.id.toString() })

  return (
    <Accordion className={'w-full'} type={'multiple'}>
      <AccordionItem value={shop.id.toString()}>
        <AccordionTrigger className={'p-0 mb-0 font-normal [&[data-state=open]]:pb-[4px]'}>
          {shop.name}
        </AccordionTrigger>
        <AccordionContent>
          {!shopList?.length ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className={'hover:bg-transparent px-0 text-sm font-normal'}
                  size={'sm'}
                  variant={'ghost'}
                >
                  Подключение
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className={'mb-4'}>
                  <SheetTitle>Добавление подключения</SheetTitle>
                  <SheetDescription>
                    Выберите нужный маркетплейс и создайте поделючение
                  </SheetDescription>
                </SheetHeader>
                <AccessConnectionForm shopId={shop.id} />
              </SheetContent>
            </Sheet>
          ) : (
            shopList?.map(s => (
              <NavLink className={'py-[4px] block hover:underline'} key={s.id} to={'#'}>
                {s.id}
              </NavLink>
            ))
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
