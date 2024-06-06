import type { infer as Infer } from 'zod'

import { object, string } from 'zod'

export const MIN_LENGTH_PASSWORD = 3

export const signUpSchema = object({
  confirmPassword: string(),
  email: string().email('Please enter a valid email address'),
  password: string()
    .min(MIN_LENGTH_PASSWORD, `Use ${MIN_LENGTH_PASSWORD} characters or more for your password`)
    .regex(/^\S.*\S$/, 'Your password can’t start or end with a blank space'),
}).refine(({ confirmPassword, password }) => password === confirmPassword, {
  message: 'Those passwords didn’t match. Try again.',
  path: ['confirmPassword'],
})

export type SignUpFormData = Infer<typeof signUpSchema>
