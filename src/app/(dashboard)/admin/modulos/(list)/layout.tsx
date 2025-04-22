import { HeaderSection } from '@/components'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <HeaderSection
        title="Módulos de la aplicación"
        description="Aquí puedes gestionar los módulos de la aplicación."
        disabledActions
      />
      {children}
    </div>
  )
}
