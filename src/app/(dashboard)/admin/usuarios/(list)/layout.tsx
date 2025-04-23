import { HeaderSection } from '@/components'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <HeaderSection
        title="Usuarios de la aplicación"
        description="Administra y gestiona los usuarios y sus permisos en la aplicación."
        disabledActions
      />
      {children}
    </div>
  )
}
