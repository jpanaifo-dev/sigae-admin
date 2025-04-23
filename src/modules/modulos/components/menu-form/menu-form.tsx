'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { menuFormSchema, MenuFormSchemaType } from './menu.schema'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
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
import { Loader, Pencil, Plus } from 'lucide-react'
import { createOrUpdateMenu } from '@/api/accounts'
import { ADMIN_URLS_APP } from '@/config/routes'

interface MenuModalProps {
  sectionId: number
  defaultValues?: Partial<MenuFormSchemaType>
  id_menu?: number
  id_module?: string
  iconOnly?: boolean
}

export const MenuForm = ({
  defaultValues,
  sectionId,
  id_module,
  id_menu,
  iconOnly = false
}: MenuModalProps) => {
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<MenuFormSchemaType>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      icon: defaultValues?.icon ?? '',
      url: defaultValues?.url ?? '',
      is_active: defaultValues?.is_active ?? false,
      section: defaultValues?.section ?? sectionId
    }
  })

  const isDirty = form.formState.isDirty // Verifica si el formulario ha sido modificado

  const onSubmit = () => {
    setOpenConfirm(true)
  }

  const confirmAction = async () => {
    setIsLoading(true) // Indica que la acción está en progreso
    try {
      const data = form.getValues() // Obtén los valores del formulario
      await createOrUpdateMenu({
        data: data,
        revalidateUrl: ADMIN_URLS_APP.MODULES.DETAIL(id_module ?? ''),
        id: id_menu ?? undefined // Si hay un ID, lo pasamos para actualizar
      }) // Llama a la API con los datos del formulario
      setOpenConfirm(false) // Cierra el diálogo de confirmación
    } catch (error) {
      console.error('Error al guardar el menú:', error)
    } finally {
    }
    setIsLoading(false) // Finaliza el estado de carga
    setOpenDialog(false) // Cierra el diálogo del formulario
    form.reset() // Resetea el formulario después de guardar
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size={iconOnly ? 'icon' : 'default'}>
          {defaultValues ? (
            <Pencil className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {!iconOnly && <>{defaultValues ? 'Editar menú' : 'Nuevo menú'}</>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? `Editar ${defaultValues.name}` : 'Nuevo menú'}
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
                    <Input placeholder="Nombre del menú" {...field} />
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
                    <Input
                      placeholder="Nombre del ícono (opcional)"
                      {...field}
                    />
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
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Ruta o URL del menú" {...field} />
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
              {defaultValues ? 'Actualizar menú' : 'Crear menú'}
            </Button>
          </form>
        </Form>
      </DialogContent>

      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción {defaultValues ? 'actualizará' : 'creará'} el menú.
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
