import type { RouteObject } from 'react-router-dom'

import { HomePage } from '@/pages/home'
import { ShopsPage } from '@/pages/shops'
import { ROUTER_PATHS } from '@/shared/config/routes'

import { AuthGuard } from './auth-guard'

const { HOME, SHOPS } = ROUTER_PATHS

export const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <HomePage />,
        path: HOME,
      },
      {
        element: <ShopsPage />,
        path: SHOPS(),
      },
    ],
    element: <AuthGuard />,
  },
]
