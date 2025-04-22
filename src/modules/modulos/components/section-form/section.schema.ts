import { z } from 'zod'

export const sectionSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  module: z.string().nullable()
})

export type SectionFormValues = z.infer<typeof sectionSchema>
