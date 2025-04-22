import { IModule } from '@/types'

interface IModulesListPageProps {
  modules: IModule[]
}

export const ModulesListPage = (props: IModulesListPageProps) => {
  const { modules } = props

  return <div>modules-list-page</div>
}
