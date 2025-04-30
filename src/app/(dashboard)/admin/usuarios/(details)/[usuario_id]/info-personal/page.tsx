import { fetchUserById } from '@/api/accounts'
import { fetchPerson } from '@/api/persons'
import { NoResults } from '@/modules/core'
import { UserForm } from '@/modules/users/components/user-form'
interface props {
  params: Promise<{ usuario_id: string }>
}

export default async function Page({ params }: props) {
  const { usuario_id } = await params

  const userData = await fetchUserById(usuario_id)
  const personData = await fetchPerson(String(userData.data?.person_uuid))

  console.log('personData', personData)

  return (
    <>
      {userData.data === null && (
        <NoResults
          title="Usuario no encontrado"
          message="No se encontraron datos del usuario seleccionado. Selecciona otro usuario o recarga el internet"
        />
      )}
      {userData && userData.data !== null && userData.data !== undefined && (
        <UserForm userData={userData.data} />
      )}
      {/* 
      {userData.data && userData?.data !== null && (
        <UserDetails
          userData={userData.data}
          url_redirect={ADMIN_URLS_APP.USERS.URL_BASE}
        />
      )} 
       */}
    </>
  )
}
