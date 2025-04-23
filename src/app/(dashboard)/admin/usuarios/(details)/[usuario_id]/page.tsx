import { fetchUserById } from '@/api/accounts'
import { NoResults } from '@/modules/core'
import { UserDetails } from '@/modules/users'
interface props {
  params: {
    usuario_id: string
  }
}

export default async function Page(props: props) {
  const { params } = props

  const userData = await fetchUserById(params.usuario_id)

  return (
    <>
      {!userData.data ||
        (userData.data === null && (
          <NoResults
            title="Usuario no encontrado"
            message="No se encontraron datos del usuario seleccionado. Selecciona otro usuario o recarga el internet"
          />
        ))}
      {userData.data && userData?.data !== null && (
        <UserDetails userData={userData.data} />
      )}
    </>
  )
}
