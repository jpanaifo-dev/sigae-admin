import { Badge } from '@/components/ui/badge'
import { ISectionMenu, IUserAccessList, IUserRoleList } from '@/types'

interface RolesViewerProps {
  modules: IUserRoleList[]
  menuRoles: IUserAccessList[]
  sections: ISectionMenu[]
}

export const RolesViewer = ({
  modules,
  menuRoles,
  sections
}: RolesViewerProps) => {
  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg border border-gray-200">
      {/* MÓDULOS */}
      <section>
        <h2 className="font-semibold text-xl mb-4 text-gray-800">
          Módulos Asignados
        </h2>
        {modules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`p-4 rounded-md border ${
                  mod.is_active
                    ? 'border-l-4 border-l-primary bg-white'
                    : 'border-l-4 border-l-red-500 bg-gray-100'
                }`}
              >
                <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
                  {mod.module.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {mod.is_admin ? 'Administrador' : 'Usuario'} | Estado:
                  <Badge
                    className="rounded-full ml-2"
                    variant={mod.is_active ? 'default' : 'destructive'}
                  >
                    {mod.is_active ? 'Activo' : 'Inactivo'}
                  </Badge>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No tiene módulos asignados.</p>
        )}
      </section>

      {/* MENÚS Y SUBMENÚS POR SECCIÓN Y MÓDULO */}
      <section>
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="font-semibold text-xl text-gray-800">
            Menús y Submenús por Sección y Módulo
          </h2>
          <p className="text-sm text-gray-500">
            Los accesos están organizados por módulo, sección, y luego
            menú/submenús.
          </p>
        </div>

        {modules.map((mod) => {
          const moduleSections = sections.filter(
            (section) => section.module === mod.module.id
          )

          if (moduleSections.length === 0) return null

          return (
            <div
              key={mod.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {mod.module.name}
                </h3>
                <Badge
                  variant={mod.is_active ? 'default' : 'destructive'}
                  className="rounded-full"
                >
                  {mod.is_active ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>

              {/* SECCIONES POR MÓDULO */}
              <div className="space-y-6">
                {moduleSections.map((section) => {
                  const sectionMenus = menuRoles.filter(
                    (role) => role.menu.section === section.id
                  )

                  if (sectionMenus.length === 0) return null

                  // Agrupar por menú
                  const groupedMenus = sectionMenus.reduce((acc, role) => {
                    const menuId = role.menu.id
                    if (!acc[menuId]) {
                      acc[menuId] = {
                        menu: role.menu,
                        subMenus: []
                      }
                    }
                    if (role.sub_menu) {
                      acc[menuId].subMenus.push(role.sub_menu)
                    }
                    return acc
                  }, {} as Record<string, { menu: IUserAccessList['menu']; subMenus: IUserAccessList['sub_menu'][] }>)

                  return (
                    <div key={section.id} className="space-y-4">
                      <h4 className="font-semibold text-lg text-gray-700">
                        {section.name}
                      </h4>
                      <div className="space-y-3">
                        {Object.values(groupedMenus).map(
                          ({ menu, subMenus }) => (
                            <div
                              key={menu.id}
                              className="pl-5 border-l-2 border-gray-300 space-y-2"
                            >
                              <div className="flex justify-between">
                                <p className="text-base font-semibold text-gray-700">
                                  {menu.name}
                                </p>
                                <span className="text-sm text-muted-foreground">
                                  {menu.is_active ? 'Activo' : 'Inactivo'}
                                </span>
                              </div>
                              {menu.description && (
                                <p className="text-sm text-gray-500">
                                  {menu.description}
                                </p>
                              )}
                              {subMenus.length > 0 ? (
                                <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
                                  {subMenus.map((sub) => (
                                    <li
                                      key={sub?.id}
                                      className="text-sm text-gray-600"
                                    >
                                      {sub?.name} —{' '}
                                      {sub?.is_active ? 'Activo' : 'Inactivo'}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-gray-400 mt-1">
                                  Sin submenús asignados.
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
