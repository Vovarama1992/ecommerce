export type ConnectionDto = {
  id: number
  name_connection: string
}

export type AccessDto = {
  connection: number
  shop: number
}

export type AfterAccessDto = {
  api_key: string
  client_id: string
  connection: number
  id: number
  shop: number
}

export type AccessOzonDto = {
  api_key: string
  client_id: string
} & AccessDto

export type AccessWildberriesDto = {
  token: string
  token_name: string
} & AccessDto

export type AccessAvitoDto = {
  client_id: string
  client_secret: string
} & AccessDto

<<<<<<< HEAD
export type CommonAccessDto = (AccessAvitoDto | AccessOzonDto | AccessWildberriesDto) & AccessDto
=======
export type ShopConnectionListDto = {
  access_to: number[]
  exp: string
  id: number
  token_name: string
} & AccessDto
>>>>>>> 990f61757518c50d96555576d97ebd97b2d7c160
