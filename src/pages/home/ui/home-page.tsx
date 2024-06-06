import { Link } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/config/routes'
import { Typography } from '@/shared/ui/typography'

export const HomePage = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <Typography asChild variant={'link1'}>
        <Link to={ROUTER_PATHS.SHOPS()}>перейти в магазины</Link>
      </Typography>
    </div>
  )
}
