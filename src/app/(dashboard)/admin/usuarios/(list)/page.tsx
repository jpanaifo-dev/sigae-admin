import { UsersListPage } from '@/modules/users'
import { fetchUsers } from '@/api/accounts'

export default async function Page() {
  const users = await fetchUsers()

  return (
    <>
      <UsersListPage userList={users.data?.results || []} />
    </>
  )
}
