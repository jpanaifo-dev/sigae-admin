import { cn } from '@/lib/utils'
import React from 'react'
import { Menu } from './menu'
import { useSidebar } from '@/hooks/use-sidebar'
import { useStore } from '@/hooks/use-store'
import { MenuConfigApps } from '@/types/configApps'
import { SectionElement } from '@/types'

interface SideBarProps {
  app?: MenuConfigApps
  menuItems?: SectionElement[]
}

export const SideBar = (props: SideBarProps) => {
  const { app, menuItems } = props
  const sidebar = useStore(useSidebar, (x) => x)
  if (!sidebar) return null
  const { getOpenState, setIsHover, settings } = sidebar

  return (
    <aside
      className={cn(
        `fixed top-0 left-0 z-10 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 w-72 bg-primary-900 text-white`,
        !getOpenState() ? 'w-[90px]' : 'w-72',
        settings.disabled && 'hidden'
      )}
    >
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Menu
          isOpen={getOpenState()}
          app={app}
          menuItems={menuItems}
        />
      </div>
    </aside>
  )
}
