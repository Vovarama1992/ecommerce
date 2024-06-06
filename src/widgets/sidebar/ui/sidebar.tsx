import { useMeQuery } from '@/entities/session'
import { shopActions } from '@/entities/shop/shop.slice'
import { useAppDispatch } from '@/shared/lib/useAppDispatch'
import { useAppSelector } from '@/shared/lib/useAppSelector'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui-shad-cn/ui/select'

import { ShopSection } from './shop-section'

export const Sidebar = () => {
  const { data } = useMeQuery()
  const currentOffice = useAppSelector(state => state.shopReducer?.currentOffice)
  const dispatch = useAppDispatch()

  const onChangeCurrentOfficeHandler = (id: string) => dispatch(shopActions.setCurrentOffice(id))

  return (
    <aside
      className={
        'fixed top-14 z-30 hidden h-[calc(100vh-var(--header-height))] w-full shrink-0 md:sticky md:block'
      }
    >
      <div className={'pt-[16px] flex flex-col gap-5'}>
        {data && (
          <Select
            onValueChange={onChangeCurrentOfficeHandler}
            value={currentOffice || data.personal_office.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder={'Select option'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={data.personal_office.toString()}>
                Офис {data?.personal_office}
              </SelectItem>
              <SelectItem value={'2'}>Офис 2</SelectItem>
            </SelectContent>
          </Select>
        )}

        <ShopSection />
      </div>
    </aside>
  )
}
