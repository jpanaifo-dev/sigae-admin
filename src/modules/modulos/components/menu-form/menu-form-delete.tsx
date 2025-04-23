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
import { deleteMenu } from '@/api/accounts'

interface MenuDeleteAlertProps {
  id: number
  urlRevalidate?: string // Ruta a revalidar (por defecto '/')
}

export const MenuDeleteAlert: React.FC<MenuDeleteAlertProps> = ({
  id,
  urlRevalidate = '/'
}) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await deleteMenu({
        id_menu: id,
        revalidateUrl: urlRevalidate // ruta a revalidar (por defecto '/')
      }) // función API para eliminar
    } catch (error) {
      console.error('Error al eliminar sección:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de eliminar este menú?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. El menú se eliminará de forma
            permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            color="destructive"
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
