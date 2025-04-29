// RolesViewer.tsx

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
    <div className="w-full flex flex-col gap-4 md:gap-6 bg-white p-4 rounded-md border border-gray-200 md:p-6">
      {/* MÓDULOS */}
      <section>
        <h2 className="font-semibold mb-2">Módulos Asignados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`p-4 py-6 rounded-md border border-l-4 ${
                mod.is_active
                  ? 'border-l-primary'
                  : 'bg-gray-100 border-l-red-500'
              }`}
            >
              <h3 className="font-bold flex items-center gap-2">
                {/* {mod.module.icon && (
                  <img src={mod.module.icon} alt="icon" className="w-5 h-5" />
                )} */}
                {mod.module.name}
              </h3>
              <p className="text-sm">
                {mod.is_admin ? 'Administrador' : 'Usuario'} | Estado:{' '}
                <Badge
                  className="rounded-full"
                  variant={mod.is_active ? 'default' : 'destructive'}
                >
                  {mod.is_active ? 'Activo' : 'Inactivo'}
                </Badge>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MENÚS Y SUBMENÚS */}
      <section>
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="font-semibold">Menús y Submenús</h2>
          <p className="text-sm text-gray-500">
            A continuación, se muestra una lista de los menús y submenús
            asignados, organizados por secciones. Cada elemento incluye
            información sobre su estado (Activo/Inactivo) y detalles
            adicionales.
          </p>
        </div>
        {sections.map((section) => {
          const sectionMenus = menuRoles.filter(
            (r) => r.menu.section === section.id
          )

          if (sectionMenus.length === 0) return null

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
            <div key={section.id} className="mb-4">
              <h3 className="font-semibold">{section.name}</h3>
              <ul className="ml-4 list-disc">
                {Object.values(groupedMenus).map(({ menu, subMenus }) => (
                  <li key={menu.id} className="mb-1">
                    <div className="flex flex-col gap-1">
                      <p className="text-lg">
                        {menu.name} -
                        <span className="text-sm text-gray-500">
                          {menu.is_active ? 'Activo' : 'Inactivo'}
                        </span>
                      </p>
                      {menu.description && (
                        <p className="text-sm text-gray-500">
                          {menu.description}{' '}
                        </p>
                      )}
                    </div>
                    {subMenus && subMenus.length > 0 && (
                      <ul className="ml-4 list-disc text-sm text-gray-700 pt-2 flex flex-col gap-2">
                        {subMenus.map((subMenu) => (
                          <li key={subMenu?.id}>
                            {subMenu?.name} -{' '}
                            {subMenu?.is_active ? 'Activo' : 'Inactivo'}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>
    </div>
  )
}
