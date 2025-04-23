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

import { submenuSchema, SubmenuFormData } from './submenu.schema'
import { createOrUpdateSubMenu } from '@/api/accounts'
import { Loader } from 'lucide-react'

interface SubmenuModalProps {
  defaultValues?: SubmenuFormData
  subMenuId: number
  menuId: number
  onConfirm: (values: SubmenuFormData) => void
}

export const SubmenuModal = ({
  defaultValues,
  subMenuId,
  menuId,
  onConfirm
}: SubmenuModalProps) => {
  const [openConfirm, setOpenConfirm] = useState(false)
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
    setOpenConfirm(false)
    setIsLoading(true)

    const formData = form.getValues()

    try {
      const response = await createOrUpdateSubMenu({
        id_subMenu: subMenuId.toString(),
        data: formData
      })

      if (response.status === 200) {
        onConfirm(formData)
      } else {
        console.error(
          'Error al crear o actualizar el submenú:',
          response.errors
        )
      }
    } catch (error) {
      console.error('Error al crear o actualizar el submenú:', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {defaultValues ? 'Editar submenú' : 'Nuevo submenú'}
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
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Activo</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
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
