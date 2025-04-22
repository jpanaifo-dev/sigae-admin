import { fetchModuleById } from '@/api/accounts'
interface Props {
  params: Promise<{ modulo_id: string }>
}

export default async function Page({ params }: Props) {
  const { modulo_id } = await params
  const dataModule = await fetchModuleById(modulo_id)

  if (dataModule?.status !== 200) {
    return <div>Error al cargar el módulo</div>
  }

  return <div>page</div>
}
