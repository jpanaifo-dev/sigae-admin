import { Badge } from '@/components/ui/badge'
import { IUserList } from '@/types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface IUserDetailsProps {
  userData: IUserList
  url_redirect?: string
  hiddenBackButton?: boolean
}
export const UserDetails = (props: IUserDetailsProps) => {
  const { userData, url_redirect, hiddenBackButton } = props

  const fullName = `${userData?.first_name} ${userData?.last_name}`

  return (
    <>
      <div className="space-y-2 w-full flex gap-3 items-center">
        {!hiddenBackButton && (
          <Link
            href={url_redirect || '#'}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-2 hover:text-gray-700 rounded-full transition-colors duration-200 border border-gray-200 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        )}
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {fullName}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant="secondary">Usuario: {userData.username}</Badge>
              <Badge variant="secondary">
                Email: {userData.email || 'No especificada'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
