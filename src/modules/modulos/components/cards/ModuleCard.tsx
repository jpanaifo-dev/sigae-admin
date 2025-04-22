import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { IModule } from '@/types'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Props = {
  course: IModule
}

const defaultBg = '/images/default-course-bg.jpg' // Asegúrate de tener esta imagen en `public/images/`

export const ModuleCard = ({ course }: Props) => {
  return (
    <Card
      key={course.uuid}
      className="rounded-md overflow-hidden shadow-md w-full"
    >
      <div className="relative h-32 w-full">
        <Image
          src={course.background || defaultBg}
          alt={course.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="px-4">
        <h3 className="text-lg font-semibold mb-2">{course.name}</h3>

        <Badge variant={course.is_active ? 'default' : 'destructive'}>
          {course.is_active ? 'Activo' : 'Inactivo'}
        </Badge>
      </CardContent>

      <CardFooter className="p-4 flex gap-2">
        <Link
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline flex items-center"
        >
          Ir a aplicación
          <ExternalLink className="ml-1" size={16} />
        </Link>
      </CardFooter>
    </Card>
  )
}
