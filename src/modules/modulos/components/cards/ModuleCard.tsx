import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { IModule } from '@/types'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ADMIN_URLS_APP } from '@/config/routes'

type Props = {
  course: IModule
}

const defaultBg = '/images/bg-card.webp' // Asegúrate de tener esta imagen en `public/images/`

export const ModuleCard = ({ course }: Props) => {
  return (
    <Card
      key={course.uuid}
      className="rounded-md overflow-hidden border w-full pt-0"
    >
      <div className="relative h-40 w-full">
        <Image
          src={course.background || defaultBg}
          alt={course.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="px-4 flex flex-col items-start gap-1">
        <Badge
          className="rounded-full"
          variant={course.is_active ? 'default' : 'destructive'}
        >
          {course.is_active ? 'Activo' : 'Inactivo'}
        </Badge>
        <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
      </CardContent>

      <CardFooter className="px-4 py-1 flex gap-2">
        <Button variant="outline" asChild>
          <Link href={ADMIN_URLS_APP.MODULES.DETAIL(course.uuid)}>
            Ver detalles
          </Link>
        </Button>
        <Link
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline flex items-center px-2"
        >
          Ir a aplicación
          <ExternalLink className="ml-1" size={16} />
        </Link>
      </CardFooter>
    </Card>
  )
}
