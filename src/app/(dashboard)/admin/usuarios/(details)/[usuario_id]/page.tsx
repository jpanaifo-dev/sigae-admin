import { fetchUserById } from '@/api/accounts'
import { UserDetails } from '@/modules/users'
interface props {
  params: {
    usuario_id: string
  }
}

export default async function Page(props: props) {
  const { params } = props

  const userData = await fetchUserById(params.usuario_id)
  console.log(userData)

  return (
    <>
      {userData.data && userData?.data !== null && (
        <UserDetails userData={userData.data} />
      )}
    </>
  )
}
