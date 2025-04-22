import React from 'react'
import { fetchModules } from '@/api/accounts'
import { ModulesListPage } from '@/modules/modulos'

export default async function Page() {
  const dataModules = await fetchModules()

  return (
    <>
      {dataModules?.data && dataModules?.data?.length > 0 && (
        <ModulesListPage modules={dataModules.data} />
      )}
    </>
  )
}
