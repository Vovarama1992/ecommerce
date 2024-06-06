import { useSignOutMutation } from '@/entities/session'
import { Button } from '@/shared/ui-shad-cn/ui/button'
import { useToast } from '@/shared/ui-shad-cn/ui/use-toast'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

export const SignOutButton = () => {
  const { toast } = useToast()

  const [signOut, { isLoading }] = useSignOutMutation()

  const handleSignOut = () => {
    signOut()
      .unwrap()
      .catch(error => {
        toast({
          description: JSON.stringify(error),
          title: 'Sign Out Error',
          variant: 'destructive',
        })
      })
  }

  return (
    <Button
      className={'h-9 w-9'}
      disabled={isLoading}
      onClick={handleSignOut}
      size={'icon'}
      variant={'ghost'}
    >
      <DotsVerticalIcon className={'h-5 w-5'} />
    </Button>
  )
}
