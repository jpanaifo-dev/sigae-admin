import type { Metadata } from 'next'
import { getUserAuth } from '@/lib/session'
import { fetchPerson } from '@/api/persons'
import { AdminPanelLayout, NavBarCustom } from '@/components/app'
// , NavBarCustom } from '@/components/app'
import { IPerson, IUserAuth, MenuConfigApps } from '@/types'
// import { ADMIN_URLS_APP } from '@/config/urls-data/admin.urls.config'
// import { redirect } from 'next/navigation'
// import { fetchSidebarAdminMenu } from '@/api/miscellaneous'
// import { TokenExpirationModal } from '@/modules/auth'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: '%s | Admin Panel | UNAP',
    default: 'Panel de administración de SIGAE - UNAP',
  },
  description: 'Panel de administración de SIGAE - UNAP',
}

const APP_NAME_KEY: MenuConfigApps = 'panel-admin-admision'

export default async function Layout(props: LayoutProps) {
  const { children } = props
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson = {} as IPerson

  const [person] = await Promise.all([
    fetchPerson(data?.person_token),
    // fetchSidebarAdminMenu(data?.user_token),
  ])

  if (person.status === 200 && person.data) {
    personData = person.data
  } else {
    console.error('Error al obtener los datos del usuario:', person)
  }

  // if (menuItems?.status !== 200) {
  //   redirect(ADMIN_URLS_APP.HOME.UNAUTHORIZED)
  // }

  return (
    <>
      <NavBarCustom
        // app={APP_NAME_KEY}
        person={personData}
        email={data?.email}
      />
      <AdminPanelLayout
        menuItems={[]}
        app={APP_NAME_KEY}
      >
        {children}
        {/* <TokenExpirationModal /> */}
      </AdminPanelLayout>
    </>
  )
}
