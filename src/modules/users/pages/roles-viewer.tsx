// RolesViewer.tsx

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
    <div className="space-y-6 w-full">
      {/* MÓDULOS */}
      <section>
        <h2 className="font-semibold mb-2">Módulos Asignados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`p-4 rounded-lg border ${
                mod.is_active ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <h3 className="font-semibold flex items-center gap-2">
                {/* {mod.module.icon && (
                  <img src={mod.module.icon} alt="icon" className="w-5 h-5" />
                )} */}
                {mod.module.name}
              </h3>
              <p className="text-sm">
                {mod.is_admin ? 'Administrador' : 'Usuario'} | Estado:{' '}
                {mod.is_active ? 'Activo' : 'Inactivo'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MENÚS Y SUBMENÚS */}
      <section>
        <h2 className="text-xl font-bold mb-2">Menús y Submenús</h2>
        {sections.map((section) => {
          const sectionMenus = menuRoles.filter(
            (r) => r.menu.section === section.id
          )

          if (sectionMenus.length === 0) return null

          return (
            <div key={section.id} className="mb-4">
              <h3 className="text-lg font-semibold">{section.name}</h3>
              <ul className="ml-4 list-disc">
                {sectionMenus.map((role) => (
                  <li key={role.id} className="mb-1">
                    <span className="font-medium">{role.menu.name}</span>{' '}
                    <span className="text-sm text-gray-500">
                      ({role.menu.description}) -{' '}
                      {role.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                    <div className="ml-4 text-sm text-gray-700">
                      ↳ Submenú: {role?.sub_menu?.name} -{' '}
                      {role?.sub_menu?.is_active ? 'Activo' : 'Inactivo'}
                    </div>
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
