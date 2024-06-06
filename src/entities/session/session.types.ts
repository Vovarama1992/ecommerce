export type UserDto = {
  created_at: string
  email: string
  id: number
  is_active: boolean
  personal_office: number
  social_id: null | number
  username: string
}

export type RegistrationDto = {
  email: string
  password: string
  password2: string
}

export type LoginDto = {
  email: string
  password: string
}
