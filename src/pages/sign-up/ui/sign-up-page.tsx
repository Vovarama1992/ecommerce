import { SignUpForm } from '@/features/auth/sign-up'
import { Typography } from '@/shared/ui/typography'
import { Card, CardContent, CardHeader } from '@/shared/ui-shad-cn/ui/card'

export const SignUpPage = () => {
  return (
    <div>
      <section>
        <Card className={'max-w-[320px] m-auto mt-5'}>
          <CardHeader>
            <Typography className={'text-center'} variant={'h1'}>
              Sign Up
            </Typography>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
