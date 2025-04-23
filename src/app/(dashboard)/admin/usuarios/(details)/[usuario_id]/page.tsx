import { fetchUserById } from '@/api/accounts'
import { NoResults } from '@/modules/core'
import { UserDetails } from '@/modules/users'
interface props {
  params: Promise<{ usuario_id: string }>
}

export default async function Page({ params }: props) {
  const { usuario_id } = await params

  const userData = await fetchUserById(usuario_id)

  console.log('user data', userData)

  return (
    <>
      {userData.data === null && (
        <NoResults
          title="Usuario no encontrado"
          message="No se encontraron datos del usuario seleccionado. Selecciona otro usuario o recarga el internet"
        />
      )}
      {userData.data && userData?.data !== null && (
        <UserDetails userData={userData.data} />
      )}
    </>
  )
}
