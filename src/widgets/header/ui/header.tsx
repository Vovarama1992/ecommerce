import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { SignOutButton } from '@/features/auth/sign-out'
import { ModeToggle } from '@/features/change-theme'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { cn } from '@/shared/lib/tailwind'
import { Mountain } from 'lucide-react'

type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'children'>

export const Header = ({ className, ...rest }: HeaderProps) => (
  <header
    className={cn(
      'fixed top-0 z-50 bg-background h-[var(--header-height)] w-full border-b border-border/40',
      className
    )}
    {...rest}
  >
    <div className={'px-8 flex h-[var(--header-height)] items-center'}>
      <Link className={'flex gap-2'} to={ROUTER_PATHS.HOME}>
        <Mountain />
        <h1 className={'text-lg font-bold'}>{import.meta.env.VITE_APP_NAME}</h1>
      </Link>

      <div className={'flex flex-1 gap-2 md:justify-end'}>
        <ModeToggle />

        <SignOutButton />
      </div>
    </div>
  </header>
)
