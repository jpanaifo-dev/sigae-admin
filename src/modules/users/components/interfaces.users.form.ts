import { z } from "zod";

export const userFormSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  first_name: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  last_name: z.string().min(1, {
    message: "El apellido es requerido",
  }),
  email: z.string().email({
    message: "Correo electrónico inválido",
  }),
  is_staff: z.boolean(),
  is_active: z.boolean(),
  is_superuser: z.boolean(),
});

export const personFormSchema = z.object({
  document_number: z.string().min(1, {
    message: "El número de documento es requerido",
  }),
  names: z.string().min(1, {
    message: "El nombre es requerido",
  }),
  last_name1: z.string().min(1, {
    message: "El primer apellido es requerido",
  }),
  last_name2: z.string().min(1, {
    message: "El segundo apellido es requerido",
  }),
  gender: z.string().min(1, {
    message: "El género es requerido",
  }),
  birthdate: z.string().min(1, {
    message: "La fecha de nacimiento es requerida",
  }),
  comunity_indigenous: z.string().optional(),
  disability: z.string().optional(),
  native_language: z.string().min(1, {
    message: "El idioma nativo es requerido",
  }),
  document_type: z.number({
    required_error: "El tipo de documento es requerido",
  }),
  person_type: z.number({
    required_error: "El tipo de persona es requerido",
  }),
  marital_status: z.number({
    required_error: "El estado civil es requerido",
  }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
export type PersonFormValues = z.infer<typeof personFormSchema>;