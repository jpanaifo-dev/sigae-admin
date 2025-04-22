'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader, Pencil, PlusCircle } from 'lucide-react'
import { SectionFormValues, sectionSchema } from './section.schema'
import { createOrUpdateSectionMenu } from '@/api/accounts'
import { ADMIN_URLS_APP } from '@/config/routes'

interface SectionFormModalProps {
  sectionId?: string
  moduleId?: string
  defaultValues?: SectionFormValues
}

export const SectionFormModal: React.FC<SectionFormModalProps> = ({
  sectionId,
  moduleId,
  defaultValues = { name: '', module: moduleId }
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues
  })

  const handleSubmit = async () => {
    setIsLoading(true)
    const values = form.getValues()
    try {
      await createOrUpdateSectionMenu({
        data: values,
        id_section: sectionId,
        urlRevalidate: ADMIN_URLS_APP.MODULES.DETAIL(String(moduleId))
      })
      setConfirmOpen(false)
      setDialogOpen(false)
      form.reset({
        module: moduleId,
        name: ''
      })
    } catch (error) {
      console.error('Error al guardar la sección:', error)
      // Aquí podrías usar un toast o alerta visual
    }
    setIsLoading(false)
  }

  const isDirty = form.formState.isDirty

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={sectionId ? 'outline' : 'default'}>
            {sectionId ? (
              <Pencil className="w-4 h-4 mr-2" />
            ) : (
              <PlusCircle className="w-4 h-4 mr-2" />
            )}
            {sectionId ? 'Editar sección' : 'Añadir sección'}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {sectionId ? 'Editar Sección' : 'Nueva Sección'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => setConfirmOpen(true))}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de la sección" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" disabled={isLoading || !isDirty}>
                  {isLoading && <Loader className="animate-spin mr-2" />}
                  {sectionId ? 'Guardar cambios' : 'Crear sección'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Confirmación */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de{' '}
              {sectionId ? 'guardar los cambios' : 'crear esta sección'}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
