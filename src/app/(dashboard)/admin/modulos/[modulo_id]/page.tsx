// import { fetchModuleById } from '@/api/accounts'
import { fetchSectionMenu, fetchMenu, fetchSubMenu } from '@/api/accounts'
import { SectionModuleList } from '@/modules/modulos'
interface Props {
  params: Promise<{ modulo_id: string }>
}

export default async function Page({ params }: Props) {
  const { modulo_id } = await params
  //   const dataModule = await fetchModuleById(modulo_id)

  //   if (dataModule?.status !== 200) {
  //     return <div>Error al cargar el módulo</div>
  //   }

  const [dataSectionMenu, dataMenu, dataSubmenu] = await Promise.all([
    fetchSectionMenu(),
    fetchMenu(),
    fetchSubMenu()
  ])

  const filteredSectionMenu =
    dataSectionMenu?.data?.filter(
      (section) => section.module === Number(modulo_id)
    ) || []

  return (
    <div>
      <SectionModuleList
        sectionList={filteredSectionMenu}
        menu={dataMenu?.data || []}
        submenu={dataSubmenu?.data || []}
        moduleId={Number(modulo_id)}
      />
    </div>
  )
}
