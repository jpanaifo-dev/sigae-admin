import { IUserList } from '@/types'

interface UsersListPageProps {
  userList: IUserList[]
}

export const UsersListPage = (props: UsersListPageProps) => {
  const { userList } = props
  return <div>users-list-page</div>
}
