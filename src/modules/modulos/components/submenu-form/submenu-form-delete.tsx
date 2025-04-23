'use client'

import * as React from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteSubmenu } from '@/api/accounts' // <-- Asegúrate de tener esta función
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface SubmenuDeleteAlertProps {
  id: number
  urlRevalidate?: string // Ruta a revalidar (por defecto '/')
}

export const SubmenuDeleteAlert: React.FC<SubmenuDeleteAlertProps> = ({
  id,
  urlRevalidate = '/'
}) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await deleteSubmenu({
        id_submenu: id,
        urlRevalidate
      })
    } catch (error) {
      console.error('Error al eliminar submenú:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Eliminar submenú</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar este submenú?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El submenú se eliminará de forma
            permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
