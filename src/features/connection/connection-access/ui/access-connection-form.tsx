import type { AccessConnectionFormData } from '../model/access-connection-schema'

import type { ComponentPropsWithoutRef } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useAccessToConnectionMutation, useGetConnectionsQuery } from '@/entities/connection'
import { cn } from '@/shared/lib/tailwind'
import { TextField } from '@/shared/ui/text-field'
import { Button } from '@/shared/ui-shad-cn/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui-shad-cn/ui/select'
import { useToast } from '@/shared/ui-shad-cn/ui/use-toast'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { accessConnectionSchema } from '../model/access-connection-schema'
import { CONNECTION_FIELDS, CONNECTIONS } from '../model/constants'

type AccessConnectionFormProps = {
  onSuccess: () => void
} & {
  shopId: number
} & Omit<ComponentPropsWithoutRef<'form'>, 'children' | 'onSubmit'>

export const AccessConnectionForm = ({
  className,

  onSuccess,
  shopId,
  ...rest
}: AccessConnectionFormProps) => {
  const { data: connections } = useGetConnectionsQuery()

  function constanter(index: number): string {
    switch (index) {
      case 6:
        return '1'
      case 5:
        return '3'
      default:
        return '2'
    }
  }
  function constantReturner(index: number) {
    switch (index) {
      case 1:
        return 6
      case 3:
        return 5
      default:
        return 4
    }
  }

  const [accessToConnection, { isLoading: isAccessLoading }] = useAccessToConnectionMutation()

  const { toast } = useToast()

  const {
    control,
    formState: { dirtyFields, errors },
    handleSubmit,
    register,
    watch,
  } = useForm<AccessConnectionFormData>({
    defaultValues: {
      apiKey: '',
      clientId: '',
      connection: '1',
    },
    resolver: zodResolver(accessConnectionSchema),
  })

  const watchConnection = watch('connection') as keyof typeof CONNECTION_FIELDS

  const connectionId = parseInt(watchConnection, 10)

  const onSubmit = handleSubmit(({ apiKey, clientId }) => {
    let requestParams: any = {}

    switch (watchConnection) {
      case CONNECTIONS.WILDBERRIES: {
        requestParams = {
          connection: constantReturner(connectionId),
          shop: shopId,
          token: apiKey,
          token_name: clientId,
        }
        break
      }
      case CONNECTIONS.AVITO: {
        requestParams = {
          client_id: clientId,
          client_secret: apiKey,
          connection: constantReturner(connectionId),
          shop: shopId,
        }
        break
      }
      case CONNECTIONS.OZON: {
        requestParams = {
          api_key: apiKey,
          client_id: clientId,
          connection: constantReturner(connectionId),
          shop: shopId,
        }
        break
      }
    }

    accessToConnection(requestParams)
      .unwrap()
      .then(res => {
        toast({
          description: 'Подключение создано, его ID: ' + res.id,
          title: 'Подключение успешно создано',
        })
        onSuccess()
      })
      .catch(error => {
        toast({
          description: JSON.stringify(error),
          title: 'Произошла ошибка',
          variant: 'destructive',
        })
      })
  })

  const isAllFieldsDirty = dirtyFields.apiKey && dirtyFields.clientId

  const isSubmitButtonDisabled = isAccessLoading || !isAllFieldsDirty

  return (
    <form className={cn('grid gap-4', className)} noValidate {...rest} onSubmit={onSubmit}>
      <Controller
        control={control}
        name={'connection'}
        render={({ field: { onChange, ...rest } }) => (
          <Select
            onValueChange={value => {
              onChange(value)
            }}
            {...rest}
          >
            <SelectTrigger className={'w-full mb-4'}>
              <SelectValue defaultValue={CONNECTIONS.OZON} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {connections?.map((connection, index: number) => (
                  <SelectItem className={'h-[30px]'} key={index} value={constanter(connection.id)}>
                    {connection.name_connection}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <TextField
        errorMessage={errors.clientId?.message}
        label={CONNECTION_FIELDS[watchConnection].id}
        {...register('clientId')}
      />

      <TextField
        errorMessage={errors.apiKey?.message}
        label={CONNECTION_FIELDS[watchConnection].token}
        {...register('apiKey')}
      />

      <Button disabled={isSubmitButtonDisabled} type={'submit'}>
        Создать подключение
      </Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
