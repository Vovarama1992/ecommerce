import type { AuthContext } from '../providers/router/types'

import { Outlet } from 'react-router-dom'

import { useMeQuery } from '@/entities/session'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
export const RootLayout = () => {
  const { isError, isLoading } = useMeQuery()

  const isAuthenticated = !isError && !isLoading

  const renderMain = (
    <main className={'grow flex flex-col pt-[var(--header-height)]'}>
      <Outlet context={{ isAuthenticated } satisfies AuthContext} />
    </main>
  )

  if (isAuthenticated) {
    return (
      <>
        <Header />

        <div
          className={
            'px-8 h-screen flex-1 gap-5 md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]'
          }
        >
          <Sidebar />

          {renderMain}
        </div>
      </>
    )
  }

  return (
    <div className={'h-screen min-w-full flex flex-col'}>
      <Header />

      {!isLoading && renderMain}
    </div>
  )
}
