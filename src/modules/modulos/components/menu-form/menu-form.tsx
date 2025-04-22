'use client'

import { useState } from 'react'
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

interface MenuModalProps {
  defaultValues?: {
    name?: string
    description?: string
    icon?: string
    url?: string
    is_active?: boolean
    section?: number | null
  }
  sectionId: number
}

export interface FormDataType {
  name: string
  description: string
  icon: string
  url: string
  is_active: boolean
  section: number | null
}

export const MenuForm = ({ defaultValues, sectionId }: MenuModalProps) => {
  const [openConfirm, setOpenConfirm] = useState(false)
  const [formData, setFormData] = useState<FormDataType>({
    name: defaultValues?.name ?? '',
    description: defaultValues?.description ?? '',
    icon: defaultValues?.icon ?? '',
    url: defaultValues?.url ?? '',
    is_active: defaultValues?.is_active ?? false,
    section: defaultValues?.section ?? sectionId
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleToggle = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      is_active: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpenConfirm(true)
  }

  const confirmAction = () => {
    setOpenConfirm(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          {defaultValues ? 'Editar menú' : 'Nuevo menú'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? 'Editar menú' : 'Crear nuevo menú'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del menú"
            required
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
          />
          <Input
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="Nombre del ícono (opcional)"
          />
          <Input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Ruta o URL del menú"
            required
          />

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Activo</label>
            <Switch
              checked={formData.is_active}
              onCheckedChange={handleToggle}
            />
          </div>

          <Button type="submit" className="w-full">
            {defaultValues ? 'Actualizar menú' : 'Crear menú'}
          </Button>
        </form>
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
