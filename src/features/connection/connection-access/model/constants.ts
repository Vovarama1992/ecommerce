export const CONNECTIONS = {
  AVITO: '2',
  OZON: '3',
  WILDBERRIES: '1',
} as const

export const CONNECTION_FIELDS = {
  [CONNECTIONS.AVITO]: {
    id: 'Client ID',
    token: 'Client secret',
  },
  [CONNECTIONS.OZON]: {
    id: 'Client ID',
    token: 'API key',
  },
  [CONNECTIONS.WILDBERRIES]: {
    id: 'Token name',
    token: 'Token',
  },
} as const
