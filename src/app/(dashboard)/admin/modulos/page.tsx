import React from 'react'
import { fetchModules } from '@/api/accounts'

export default async function Page() {
  const dataModules = await fetchModules()

  return <div>page</div>
}
