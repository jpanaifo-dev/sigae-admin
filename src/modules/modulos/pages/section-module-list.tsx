import { IMenuList, ISectionMenu } from '@/types'

interface Props {
  sectionList: ISectionMenu[] // Cambia el tipo según la estructura de tus datos
  menu: IMenuList[]
}

export const SectionModuleList = ({ sectionList, menu }: Props) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Lista de Secciones
      </h1>
      {sectionList.length > 0 ? (
        <ul className="list-disc pl-5 space-y-4">
          {sectionList.map((section) => (
            <li key={section.id} className="text-gray-700">
              <span className="font-medium">{section.name}</span>
              <ul className="list-disc pl-5 space-y-2">
                {menu
                  .filter((item) => item.section === section.id)
                  .map((menuItem) => (
                    <li key={menuItem.id} className="text-gray-600">
                      {menuItem.name}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay secciones disponibles.</p>
      )}
    </div>
  )
}
