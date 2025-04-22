import React from 'react'
import { fetchModules } from '@/api/accounts'

export default async function Page() {
  const dataModules = await fetchModules()

  console.log('dataModules', dataModules)

  return <div>page</div>
}
