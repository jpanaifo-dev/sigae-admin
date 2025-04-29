import { IMenuList, ISubMenuList } from './IMenuList'
import { IModule } from './IModule'

export interface IUserAccess {
  id: number
  is_active: boolean
  user: number
  menu: number
  sub_menu: number | null
}
export interface IUserAccessList {
  id: number
  is_active: boolean
  user: number
  menu: IMenuList
  sub_menu: ISubMenuList | null
}

export interface IUserRole {
  id: number
  is_admin: boolean
  is_active: boolean
  user: number
  module: number
}

export interface IUserRoleList {
  id: number
  is_admin: boolean
  is_active: boolean
  user: number
  module: IModule
}
