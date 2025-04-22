'use client'
import { cn } from '@/lib/utils'
import { SideBar } from './side-bar'
import { BreadcrumbCustom } from './breadcrumb-custom'
import { MenuConfigApps } from '@/types'
import { SectionElement } from '@/types'
import { useSidebar, useStore } from '@/hooks'

export const AdminPanelLayout = ({
  children,
  app,
  menuItems
}: {
  children: React.ReactNode
  app?: MenuConfigApps
  menuItems?: SectionElement[]
}) => {
  const sidebar = useStore(useSidebar, (x) => x)
  if (!sidebar) return null
  const { getOpenState, settings } = sidebar

  return (
    <>
      <SideBar menuItems={menuItems} app={app} />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 relative',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}
      >
        <section className="px-4 py-3 bg-gray-100 sticky top-14 z-20">
          <BreadcrumbCustom />
        </section>
        <main className="w-full container mx-auto">{children}</main>
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
        )}
      >
        {/* <Footer /> */}
      </footer>
    </>
  )
}
