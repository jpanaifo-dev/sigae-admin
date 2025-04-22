import { IMenuList, ISectionMenu, ISubMenuList } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pencil, Trash2, EyeOff, Eye } from 'lucide-react'
import { SectionFormModal } from '../components'

interface Props {
  moduleId?: number // id del módulo al que pertenece la sección
  sectionList: ISectionMenu[]
  menu: IMenuList[]
  submenu?: ISubMenuList[]
}

export const SectionModuleList = ({
  moduleId,
  sectionList,
  menu,
  submenu
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-extrabold text-gray-800">
            Gestión de Secciones
          </h1>
          <p className="text-sm text-gray-500">
            Aquí puedes gestionar las secciones de los módulos de la aplicación.
          </p>
        </div>
        <SectionFormModal moduleId={moduleId?.toString()} />
      </div>

      {sectionList.length > 0 ? (
        sectionList.map((section) => (
          <Card key={section.id} className="shadow-none rounded-md border py-2">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-700">
                  {section.name}
                </h2>
                <div className="space-x-2">
                  <SectionFormModal
                    moduleId={moduleId?.toString()}
                    sectionId={section.id.toString()}
                    defaultValues={{
                      name: section.name,
                      module: section.module.toString()
                    }}
                  />
                </div>
              </div>

              <div className="ml-4">
                {menu
                  .filter((item) => item.section === section.id)
                  .map((menuItem) => (
                    <div
                      key={menuItem.id}
                      className="pl-2 border-l border-gray-300 mb-2"
                    >
                      <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium">{menuItem.name}</span>
                        <div className="space-x-2">
                          <Button size="icon" variant="ghost">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            {menuItem.is_active ? (
                              <Eye className="w-4 h-4 text-green-500" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-yellow-500" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {submenu &&
                        submenu
                          .filter((subItem) => subItem.menu === menuItem.id)
                          .map((subMenuItem) => (
                            <div
                              key={subMenuItem.id}
                              className="ml-4 text-gray-600 flex justify-between items-center"
                            >
                              <span>- {subMenuItem.name}</span>
                              <div className="space-x-1">
                                <Button size="icon" variant="ghost">
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  {subMenuItem.is_active ? (
                                    <Eye className="w-4 h-4 text-green-500" />
                                  ) : (
                                    <EyeOff className="w-4 h-4 text-yellow-500" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          ))}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No hay secciones disponibles.</p>
      )}
    </div>
  )
}
