import React from 'react'
import { HeaderSection } from '@/components'
import { fetchModuleById } from '@/api/accounts'
import { ADMIN_URLS_APP } from '@/config/routes'

interface Props {
  params: Promise<{ modulo_id: string }>
  children: React.ReactNode
}

export default async function Layout({ params, children }: Props) {
  const { modulo_id } = await params
  const dataModule = await fetchModuleById(modulo_id)

  if (dataModule?.status !== 200) {
    return <div>Error al cargar el módulo</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <HeaderSection
        title={`MÓDULO: ${dataModule?.data?.name}`}
        description="Gestiona las configuraciones del módulo."
        disabledActions
        backButton
        urlBack={ADMIN_URLS_APP.MODULES.URL_BASE}
      />
      {children}
    </div>
  )
}
