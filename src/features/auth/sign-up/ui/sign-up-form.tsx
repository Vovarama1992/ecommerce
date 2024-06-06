import type { SignUpFormData } from '../model/sign-up-schema'

import type { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useSignUpMutation } from '@/entities/session'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { TextField } from '@/shared/ui/text-field'
import { Button } from '@/shared/ui-shad-cn/ui/button'
import { useToast } from '@/shared/ui-shad-cn/ui/use-toast'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { signUpSchema } from '../model/sign-up-schema'

type SignUpFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'children' | 'onSubmit'>

export const SignUpForm = (props: SignUpFormProps) => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    control,
    formState: { dirtyFields, errors },
    handleSubmit,
    register,
  } = useForm<SignUpFormData>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const [signUp, { isLoading }] = useSignUpMutation()

  const onSubmit = handleSubmit(({ confirmPassword, email, password }) => {
    signUp({ email, password, password2: confirmPassword })
      .unwrap()
      .then(user => {
        toast({
          description: `We’ve sent an Email with instructions to ${user.email}`,
          title: 'Sign Up Success',
          type: 'background',
        })

        navigate(ROUTER_PATHS.SIGN_IN, { replace: true })
      })
      .catch(error => {
        toast({
          description: JSON.stringify(error.data),
          title: 'Sign Up Error',
          variant: 'destructive',
        })
      })
  })

  const isAllFieldsDirty = dirtyFields.email && dirtyFields.password && dirtyFields.confirmPassword

  return (
    <form className={'grid gap-4'} noValidate {...props} onSubmit={onSubmit}>
      <TextField.Email
        {...register('email')}
        errorMessage={errors.email?.message}
        label={'Email'}
        placeholder={'email@example.com'}
      />

      <TextField.Password
        {...register('password')}
        errorMessage={errors.password?.message}
        label={'Password'}
        placeholder={'******'}
      />

      <TextField.Password
        {...register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
        label={'Confirm Password'}
        placeholder={'******'}
      />

      <Button className={'w-full'} disabled={isLoading || !isAllFieldsDirty} type={'submit'}>
        Sign Up
      </Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
