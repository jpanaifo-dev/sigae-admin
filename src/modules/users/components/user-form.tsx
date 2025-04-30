'use client'

import { useState } from 'react'
import { IUserList } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { userFormSchema, UserFormValues } from './interfaces.users.form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
  //   AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface UserFormProps {
  userData: IUserList
}

export function UserForm({ userData }: UserFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      is_staff: userData.is_staff,
      is_active: userData.is_active,
      is_superuser: userData.is_superuser
    }
  })

  const onSubmit = (values: UserFormValues) => {
    console.log('Form values:', values)
    setShowConfirmDialog(true)
  }

  const handleConfirmSave = () => {
    // onSave(form.getValues())
    setIsEditing(false)
    setShowConfirmDialog(false)
  }

  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          Información de Usuario
        </CardTitle>
        <CardDescription>
          Datos de la cuenta y permisos del usuario
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-3">Permisos de usuario</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Usuario activo</FormLabel>
                        <FormDescription>
                          Permite al usuario iniciar sesión
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_staff"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Miembro del staff</FormLabel>
                        <FormDescription>
                          Acceso al panel de administración
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_superuser"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Superusuario</FormLabel>
                        <FormDescription>
                          Acceso total al sistema
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-sm font-medium mb-3">
                Información adicional
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Último acceso</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.last_login
                      ? format(new Date(userData.last_login), 'PPpp', {
                          locale: es
                        })
                      : 'Nunca'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Fecha de registro</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(userData.date_joined), 'PPpp', {
                      locale: es
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">UUID</p>
                  <p className="text-sm text-muted-foreground">
                    {userData.uuid}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">ID</p>
                  <p className="text-sm text-muted-foreground">{userData.id}</p>
                </div>
              </div>
            </div>

            {isEditing && (
              <Button type="submit" className="mt-4">
                Guardar cambios
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (isEditing) {
              form.reset()
            }
            setIsEditing(!isEditing)
          }}
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </Button>
      </CardFooter>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar cambios?</AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de modificar la información del usuario. Esta acción
              no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
