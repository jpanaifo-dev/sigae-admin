import { IMenuList, ISectionMenu, ISubMenuList } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Pencil, Trash2, Plus } from 'lucide-react'
import {
  MenuDeleteAlert,
  MenuForm,
  SectionDeleteAlert,
  SectionFormModal
} from '../components'
import { ADMIN_URLS_APP } from '@/config/routes'

interface Props {
  moduleId?: number
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
              <div className="flex justify-between items-center pb-2">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold text-gray-700">
                      {section.name}
                    </h2>

                    <SectionFormModal
                      moduleId={moduleId?.toString()}
                      sectionId={section.id.toString()}
                      defaultValues={{
                        name: section.name,
                        module: section.module.toString()
                      }}
                      iconOnly
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Aquí puedes gestionar los menús de la sección{' '}
                    <span className="font-bold">{section.name}</span>.
                  </p>
                </div>
                <div className="space-x-2">
                  <MenuForm
                    id_module={moduleId?.toString()}
                    sectionId={section.id}
                  />
                  <SectionDeleteAlert
                    id={String(section.id)}
                    urlRevalidate={ADMIN_URLS_APP.MODULES.DETAIL(
                      section.id.toString()
                    )}
                  />
                </div>
              </div>

              <hr className="border-gray-300" />

              <div className="ml-4 space-y-4">
                {menu
                  .filter((item) => item.section === section.id)
                  .map((menuItem) => (
                    <div
                      key={menuItem.id}
                      className="pl-2 border-l border-gray-300 mb-3"
                    >
                      <div className="flex justify-between items-center text-gray-700">
                        <div className="w-full max-w-7xl flex items-center space-x-2">
                          {menuItem.icon && (
                            <span
                              className="text-gray-500"
                              dangerouslySetInnerHTML={{
                                __html: menuItem.icon
                              }}
                            />
                          )}
                          <div className="flex flex-col">
                            <p className="font-medium">{menuItem.name}</p>
                            <p className="text-xs text-gray-500">
                              {menuItem.description || 'Sin descripción'}
                            </p>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <MenuForm
                            id_module={moduleId?.toString()}
                            sectionId={section.id}
                            iconOnly
                            id_menu={menuItem.id}
                            defaultValues={{
                              name: menuItem.name,
                              description: menuItem.description,
                              icon: menuItem.icon,
                              url: menuItem.url || undefined,
                              is_active: menuItem.is_active,
                              section: section.id
                            }}
                          />
                          <MenuDeleteAlert
                            id={menuItem.id}
                            urlRevalidate={ADMIN_URLS_APP.MODULES.DETAIL(
                              section.id.toString()
                            )}
                          />
                          {/* Botón para agregar submenú */}
                          <Button size="icon" variant="outline">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Submenús */}
                      {submenu &&
                        submenu
                          .filter((subItem) => subItem.menu === menuItem.id)
                          .map((subMenuItem) => (
                            <div
                              key={subMenuItem.id}
                              className="ml-4 text-gray-600 flex justify-between items-center mt-1"
                            >
                              <span>- {subMenuItem.name}</span>
                              <div className="space-x-1">
                                <Button size="icon" variant="ghost">
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                  <Trash2 className="w-4 h-4 text-red-500" />
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
