'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Plus, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderSectionProps {
  title?: string
  description?: string
  showDivider?: boolean
  disabledActions?: boolean
  children?: never
  showAddButton?: boolean
  showRefreshButton?: boolean
  showExportButton?: boolean
  hrefAddLink?: string
  onRefreshButtonClick?: () => void
  onExportButtonClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  buttonLabel?: string
  addIcon?: React.ReactNode
  rightContent?: React.ReactNode
  badgeStatus?: string
  badgePublic?: string
  addButtonVariant?: 'secondary' | 'default' | 'outline' | 'ghost' | 'link'
  backButton?: boolean
  urlBack?: string
}

const fontSize = {
  sm: {
    title: 'text-base',
    description: 'text-sm'
  },
  md: {
    title: 'text-xl',
    description: 'text-sm'
  },
  lg: {
    title: 'text-2xl',
    description: 'text-base'
  }
}

export const HeaderSection = (props: HeaderSectionProps) => {
  const {
    title,
    description,
    size = 'md',
    showDivider = true,
    showAddButton = true,
    showExportButton = true,
    showRefreshButton = false,
    hrefAddLink,
    onExportButtonClick,
    onRefreshButtonClick,
    disabledActions,
    children,
    buttonLabel,
    addIcon,
    rightContent,
    badgeStatus,
    badgePublic,
    addButtonVariant = 'secondary',
    backButton = false,
    urlBack
  } = props

  const fontSizeTitle = fontSize[size].title
  const fontSizeDescription = fontSize[size].description

  const router = useRouter()

  const handleBackButtonClick = () => {
    if (urlBack) {
      router.push(urlBack)
    } else {
      router.back()
    }
  }

  return (
    <main className="py-6 rounded-lg flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {backButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackButtonClick}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h2 className={`font-bold text-gray-800 ${fontSizeTitle}`}>
              {title || 'Título de la sección'}
            </h2>
            {badgeStatus && (
              <Badge
                variant="outline"
                className={`${
                  badgeStatus === 'Activo' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
              >
                {badgeStatus || 'Estado'}
              </Badge>
            )}
            {badgePublic && (
              <Badge variant="outline" className="bg-blue-500 text-white">
                {badgePublic || 'Publico'}
              </Badge>
            )}
          </div>
          {description && (
            <h2 className={`text-gray-600 ${fontSizeDescription}`}>
              {description || 'Descripción de la sección'}
            </h2>
          )}
        </div>
        {rightContent && <div className="flex justify-end">{rightContent}</div>}
      </div>
      {showDivider && <hr className="border-gray-200" />}
      {!disabledActions && (
        <div className="flex gap-2 md:flex-row space-x-2 w-full overflow-x-auto xl:overflow-x-hidden">
          {showAddButton && (
            <Button
              variant={addButtonVariant}
              className={
                addButtonVariant === 'default'
                  ? addButtonVariant
                  : 'bg-ghost-100'
              }
              asChild
            >
              <Link href={hrefAddLink || '#'}>
                {addIcon || <Plus className="mr-2 h-4 w-4" />}
                {buttonLabel || 'Agregar nuevo'}
              </Link>
            </Button>
          )}
          {showRefreshButton && (
            <Button
              variant="secondary"
              className="bg-default-100"
              onClick={onRefreshButtonClick}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualizar
            </Button>
          )}
          {showExportButton && (
            <Button
              variant="secondary"
              className="bg-default-100"
              onClick={onExportButtonClick}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          )}
        </div>
      )}
      {children && <div className="mt-4">{children}</div>}
    </main>
  )
}
