import { z } from 'zod'

export const menuFormSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es obligatorio' }),
  description: z.string().optional(),
  icon: z.string().optional(),
  url: z.string().min(1, { message: 'La URL es obligatoria' }),
  is_active: z.boolean(),
  section: z.number().nullable()
})

export type MenuFormSchemaType = z.infer<typeof menuFormSchema>
