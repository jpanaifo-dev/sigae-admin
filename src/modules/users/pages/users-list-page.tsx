import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ADMIN_URLS_APP } from '@/config/routes'
import { formatDate } from '@/lib/format-dates'
import { IUserList } from '@/types'
import Link from 'next/link'

interface UsersListPageProps {
  userList: IUserList[]
}

export const UsersListPage = (props: UsersListPageProps) => {
  const { userList } = props
  return (
    <>
      <div className="overflow-x-auto rounded-md border bg-white">
        <div className="min-w-full">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="p-4">Usuario</TableHead>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Creado el</TableHead>
                <TableHead>Último acceso</TableHead>
                <TableHead>Activo</TableHead>
                <TableHead>Superusuario</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.length > 0 ? (
                userList.map((user) => (
                  <TableRow key={user.uuid}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div>{`${user.first_name} ${user.last_name}`}</div>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </TableCell>

                    <TableCell>{formatDate(user?.date_joined)}</TableCell>
                    <TableCell>
                      {user?.last_login
                        ? formatDate(user?.last_login)
                        : 'No registrado'}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.is_active ? (
                        <Badge variant="default" className="rounded-full">
                          Activo
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="rounded-full">
                          Inactivo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.is_superuser ? (
                        <Badge variant="default" className="rounded-full">
                          Sí
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="rounded-full">
                          No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={ADMIN_URLS_APP.USERS.DETAIL(user.id.toString())}
                        className="text-blue-500 hover:underline truncate"
                        title="Ver detalles"
                      >
                        Ver Detalles
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
