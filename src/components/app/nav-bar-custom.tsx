'use client'
import { useStore } from 'zustand'
import { useSidebar } from '@/hooks'
import { ModeToggle, SidebarToggle } from '@/components/buttons'
import { LogoRender } from '../miscellaneous'
import { cn } from '@/lib/utils'
import { IPerson } from '@/types'
import { ADMIN_URLS_APP } from '@/config/routes'
// import { MoreApps } from './more-apps'
// import { SidebarToggle } from './sidebar-toggle'
// import { SheetMenu } from './sheet-menu'
// import { configApps } from '@/types/configApps'
// import { IMoreApp } from '@/types/more-apps'
// import { GripIcon } from 'lucide-react'
// import { ProfilePopover } from '@/modules/app'
// import { MENU_PROFILE } from '@/config/urls-data/profile-menu'

interface NavBarCustomProps {
  // app?: keyof typeof configApps
  // moreApps?: Array<IMoreApp>
  person?: IPerson
  email?: string
}

// const MoreAppsButton: Array<IMoreApp> = [
//   {
//     id: 1,
//     title: 'EPG',
//     icon: 'https://cdn-icons-png.flaticon.com/512/1804/1804486.png',
//     url: 'https://epg.unap.edu.co',
//   },
//   {
//     id: 2,
//     title: 'EPG-UNAP',
//     icon: 'https://cdn-icons-png.flaticon.com/512/1804/1804486.png',
//     url: 'https://epg-unap.unap.edu.co',
//   },
//   {
//     id: 3,
//     title: 'EPG',
//     icon: 'https://cdn-icons-png.flaticon.com/512/1804/1804486.png',
//     url: 'https://epg.unap.edu.co',
//   },
// ]

export const NavBarCustom = (props: NavBarCustomProps) => {
  const {} = props

  const sidebar = useStore(useSidebar, (x) => x)
  if (!sidebar) return null
  const { isOpen, toggleOpen } = sidebar

  // const appConfig = app ? configApps[app] : configApps['panel-admin']

  // const colorApp = appConfig.color
  // const nameApp = appConfig.name
  const colorApp = '#1E3A8A' // appConfig.color
  const nameApp = 'Panel de administración' // appConfig.name

  return (
    <header
      className={cn(
        `sticky top-0 z-50 w-full  shadow text-white dark:shadow-secondary`
      )}
      style={{
        backgroundColor: colorApp,
      }}
    >
      <div className="px-4 sm:px-6 md:px-7 flex h-16 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0 sm:gap-3">
          {/* <SheetMenu title={nameApp} /> */}
          <SidebarToggle
            isOpen={isOpen}
            setIsOpen={toggleOpen}
          />
          <LogoRender
            nameApp={nameApp}
            href={ADMIN_URLS_APP.BASE.URL_BASE}
            className="w-full max-w-36"
          />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />
          {/* {MoreAppsButton && MoreAppsButton.length > 0 && (
            <MoreApps apps={MoreAppsButton}>
              <GripIcon />
            </MoreApps>
          )} */}
          {/*Menu de perfil*/}
          {/* <ProfilePopover
            profileData={{
              names: `${person?.names} ${person?.last_name1} ${person?.last_name2}`,
              email,
              photo: person?.photo,
            }}
            menuSections={MENU_PROFILE.ADMIN}
            showProgress={false}
            showBorders={false}
          /> */}
        </div>
      </div>
    </header>
  )
}
