import { IModule } from '@/types'
import { ModuleCard } from '../components'

interface IModulesListPageProps {
  modules: IModule[]
}

export const ModulesListPage = (props: IModulesListPageProps) => {
  const { modules } = props

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {modules.map((module) => (
        <ModuleCard key={module.uuid} course={module} />
      ))}
    </div>
  )
}
