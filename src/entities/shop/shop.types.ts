export type CreateShopDto = {
  name: string
  owner: number
}

export type ShopDto = {
  id: number
  in_archived: boolean
  name: string
  owner: number
  time_create: string
  time_update: string
}

export type UpdateShopDto = {
  id: number
  name: string
}

export type InitialShopState = {
  currentOffice?: string
}
