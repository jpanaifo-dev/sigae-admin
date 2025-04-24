import { fetchUserById } from '@/api/accounts'
import { fetchPerson } from '@/api/persons'
import { ADMIN_URLS_APP } from '@/config/routes'
import { NoResults } from '@/modules/core'
import { UserDetails } from '@/modules/users'
interface props {
  params: Promise<{ usuario_id: string }>
}

export default async function Page({ params }: props) {
  const { usuario_id } = await params

  const userData = await fetchUserById(usuario_id)
  const personData = await fetchPerson(userData.data?.person_uuid || '')

  return (
    <>
      {userData.data === null && (
        <NoResults
          title="Usuario no encontrado"
          message="No se encontraron datos del usuario seleccionado. Selecciona otro usuario o recarga el internet"
        />
      )}
      {/* {userData.data && userData?.data !== null && (
        <UserDetails
          userData={userData.data}
          url_redirect={ADMIN_URLS_APP.USERS.URL_BASE}
        />
      )} */}
    </>
  )
}
