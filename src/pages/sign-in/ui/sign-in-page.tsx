import { Link } from 'react-router-dom'

import { SignInForm } from '@/features/auth/sign-in'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { Typography } from '@/shared/ui/typography'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui-shad-cn/ui/card'

export const SignInPage = () => {
  return (
    <div>
      <section>
        <Card className={'max-w-[320px] m-auto mt-5'}>
          <CardHeader>
            <Typography className={'text-center'} variant={'h1'}>
              Sign In
            </Typography>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter className={'flex flex-col justify-center'}>
            <Typography>Don&#39;t have an account?</Typography>
            <Typography asChild variant={'link2'}>
              <Link to={ROUTER_PATHS.SIGN_UP}>Sign Up</Link>
            </Typography>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
