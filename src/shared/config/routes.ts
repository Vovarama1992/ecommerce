export const ROUTER_PATHS = {
  CREATE_ROLE: () => ROUTER_PATHS.OFFICE + '/roles',
  HOME: '/',
  NOT_FOUND: '*',
  OFFICE: '/office',
  OFFICE_CONNECTIONS: (id: number) => ROUTER_PATHS.SHOPS() + `/${id}/connections`,
  SHOPS: () => ROUTER_PATHS.OFFICE + '/shops',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const
