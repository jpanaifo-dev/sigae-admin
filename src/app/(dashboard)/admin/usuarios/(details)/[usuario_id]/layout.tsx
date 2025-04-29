import { fetchUserById } from '@/api/accounts'
import { Badge } from '@/components/ui/badge'
import { ADMIN_URLS_APP } from '@/config/routes'
import { Aside } from '@/modules/core'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ usuario_id: string }>
}) {
  const { usuario_id } = await params

  const user = await fetchUserById(usuario_id)

  const fullName = user.data?.first_name + ' ' + user.data?.last_name

  return (
    <div className="py-4">
      <div className="bg-white border rounded-md p-4 mb-4 flex gap-4 items-start md:gap-6">
        <Link href={ADMIN_URLS_APP.USERS.URL_BASE}>
          <div className="bg-white border rounded-full p-2">
            <ArrowLeftIcon className="w-4 h-4 text-gray-500" />
          </div>
        </Link>
        <div className="header mb-4 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">Detalles de usuario</p>
            <h1 className="text-xl font-bold">{fullName}</h1>
          </div>
          <div className="flex flex-col gap-1">
            <Badge className="text-sm rounded-full px-4">
              Usuario: {user?.data?.username}
            </Badge>
            <p className="text-sm">
              Email:
              {user?.data?.email ? user?.data?.email : 'No disponible'}
            </p>
          </div>
        </div>
      </div>
      <Aside
        items={[
          {
            id: ADMIN_URLS_APP.USERS.DETAIL(usuario_id),
            href: ADMIN_URLS_APP.USERS.DETAIL(usuario_id),
            title: 'Perfil'
          },
          {
            id: ADMIN_URLS_APP.USERS.LOGS(usuario_id),
            href: ADMIN_URLS_APP.USERS.PERMISSIONS(usuario_id),
            title: 'Permisos'
          },
          {
            id: ADMIN_URLS_APP.USERS.ROLES(usuario_id),
            href: ADMIN_URLS_APP.USERS.ROLES(usuario_id),
            title: 'Grupos'
          }
        ]}
      >
        {children}
      </Aside>
    </div>
  )
}
