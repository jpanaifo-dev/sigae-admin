// schemas/submenu-schema.ts
import { z } from 'zod'

export const submenuSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  icon: z.string().optional(),
  url: z.string().min(1, 'La URL es requerida'),
  is_active: z.boolean(),
  menu: z.number()
})

export type SubmenuFormData = z.infer<typeof submenuSchema>
