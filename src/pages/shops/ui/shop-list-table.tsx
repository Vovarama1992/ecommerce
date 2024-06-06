import { useGetUserShopsQuery } from '@/entities/shop'
import { UpdateShopButton } from '@/features/shop/update-shop'
import { Button } from '@/shared/ui-shad-cn/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui-shad-cn/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/ui-shad-cn/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui-shad-cn/ui/table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'

const TABLE_HEADS = ['ID', 'Название', 'Статус', 'Создан', 'Изменён', null]

export const ShopListTable = () => {
  const { data: shops } = useGetUserShopsQuery()

  return (
    <Table>
      <TableHeader className={'h-[70px] text-[16px]'}>
        <TableRow>
          {TABLE_HEADS.map((head, index) => (
            <TableHead className={'pl-[19px]'} key={index}>
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops?.map(shop => (
          <TableRow key={shop.id}>
            <TableCell className={'pl-[19px]'}>{shop.id}</TableCell>
            <TableCell className={'pl-[19px]'}>{shop.name}</TableCell>
            <TableCell className={'pl-[19px]'}>
              {shop.in_archived ? 'в архиве' : 'активный'}
            </TableCell>
            <TableCell className={'pl-[19px]'}>{formatDateString(shop.time_create)}</TableCell>
            <TableCell className={'pl-[19px]'}>{formatDateString(shop.time_update)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={'icon'} variant={'ghost'}>
                    <DotsHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Действия</DropdownMenuLabel>
                  <DropdownMenuItem onClick={e => e.preventDefault()}>
                    <UpdateShopButton shop={shop} />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={e => e.preventDefault()}>
                    <Dialog>
                      <DialogTrigger>Удалить</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Удаление магазина</DialogTitle>
                          <DialogDescription>
                            Вы действительно хотите удалить магазин?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className={'sm:justify-between gap-2'}>
                          <DialogClose asChild>
                            <Button variant={'secondary'}>Отмена</Button>
                          </DialogClose>
                          <Button>Подтвердить</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function formatDateString(isoString: string) {
  const date = new Date(isoString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`

  return formattedDate
}
