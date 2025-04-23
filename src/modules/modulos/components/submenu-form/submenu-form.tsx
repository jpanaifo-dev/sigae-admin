'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction
} from '@/components/ui/alert-dialog'

import { submenuSchema, SubmenuFormData } from './submenu.schema'
import { createOrUpdateSubMenu } from '@/api/accounts'
import { Loader, Pencil, Plus } from 'lucide-react'
import { ADMIN_URLS_APP } from '@/config/routes'

interface SubmenuModalProps {
  defaultValues?: SubmenuFormData
  subMenuId?: number
  menuId: number
  idModule?: string
  iconOnly?: boolean
}

export const SubmenuModal = ({
  defaultValues,
  subMenuId,
  menuId,
  idModule,
  iconOnly = false
}: SubmenuModalProps) => {
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SubmenuFormData>({
    resolver: zodResolver(submenuSchema),
    defaultValues: {
      id: defaultValues?.id,
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      icon: defaultValues?.icon ?? '',
      url: defaultValues?.url ?? '',
      is_active: defaultValues?.is_active ?? false,
      menu: defaultValues?.menu ?? menuId
    }
  })

  const isDirty = form.formState.isDirty

  const onSubmit = () => {
    setOpenConfirm(true)
  }

  const confirmAction = async () => {
    setIsLoading(true)

    try {
      const formData = form.getValues()
      const response = await createOrUpdateSubMenu({
        id_subMenu: subMenuId ? subMenuId.toString() : undefined,
        data: formData,
        urlValidate: ADMIN_URLS_APP.MODULES.DETAIL(String(idModule))
      })

      if (response.status === 200) {
      } else {
        console.error(
          'Error al crear o actualizar el submenú:',
          response.errors
        )
      }
    } catch (error) {
      console.error('Error al crear o actualizar el submenú:', error)
    }
    setIsLoading(false) // Finaliza el estado de carga
    setOpenDialog(false) // Cierra el diálogo del formulario
    form.reset() // Rese
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size={iconOnly ? 'icon' : 'sm'}>
          {subMenuId ? (
            <Pencil className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4 " />
          )}
          {!iconOnly && (
            <>{defaultValues ? 'Editar submenú' : 'Nuevo submenú'}</>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? 'Editar submenú' : 'Crear nuevo submenú'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del submenú" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícono</FormLabel>
                  <FormControl>
                    <Input placeholder="Ícono (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruta o URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Ruta o URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Activo</FormLabel>
                    <FormDescription>¿Este menú está activo?</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !isDirty}
            >
              {isLoading && <Loader className="animate-spin mr-2" />}
              {defaultValues ? 'Actualizar submenú' : 'Crear submenú'}
            </Button>
          </form>
        </Form>
      </DialogContent>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción {defaultValues ? 'actualizará' : 'creará'} el submenú.
            ¿Deseas continuar?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenConfirm(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}
