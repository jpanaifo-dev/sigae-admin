'use client'
import * as React from 'react'
import { z } from 'zod'
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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil, PlusCircle } from 'lucide-react'

// Define schema con zod
const sectionSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  module: z.string().nullable()
})

type SectionFormValues = z.infer<typeof sectionSchema>

interface SectionFormModalProps {
  sectionId?: string // si existe => editar, si no => crear
  moduleId?: string // id del módulo al que pertenece la sección
  defaultValues?: SectionFormValues
}

export const SectionFormModal: React.FC<SectionFormModalProps> = ({
  sectionId,
  moduleId,
  defaultValues = { name: '', module: moduleId }
}) => {
  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues
  })

  const handleSubmit = (data: SectionFormValues) => {
    console.log('Datos del formulario:', data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
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
            onSubmit={form.handleSubmit(handleSubmit)}
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
              <Button type="submit">
                {sectionId ? 'Guardar cambios' : 'Crear sección'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
