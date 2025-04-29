import { fetchUserAccessByUserId, fetchSectionMenu } from '@/api/accounts'
import { fetchUserRoleByUserId } from '@/api/accounts/user-role'
import { RolesViewer } from '@/modules/users'

interface IProps {
  params: Promise<{ usuario_id: string }>
}

export default async function Page({ params }: IProps) {
  const { usuario_id } = await params

  const userRoles = await fetchUserRoleByUserId(usuario_id)
  const userAccess = await fetchUserAccessByUserId(usuario_id)
  const sectionList = await fetchSectionMenu()

  return (
    <RolesViewer
      modules={userRoles.results}
      sections={sectionList.data || []}
      menuRoles={userAccess.results || []}
    />
  )
}
