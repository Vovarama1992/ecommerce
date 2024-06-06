import type { RouteObject } from 'react-router-dom'

import { SignInPage } from '@/pages/sign-in'
import { SignUpPage } from '@/pages/sign-up'
import { ROUTER_PATHS } from '@/shared/config/routes'

import { GuestGuard } from './guest-guard'

const { NOT_FOUND, SIGN_IN, SIGN_UP } = ROUTER_PATHS

export const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignInPage />,
        path: SIGN_IN,
      },
      {
        element: <SignUpPage />,
        path: SIGN_UP,
      },
    ],
    element: <GuestGuard />,
  },
  {
    element: <div>Not found</div>,
    path: NOT_FOUND,
  },
]
