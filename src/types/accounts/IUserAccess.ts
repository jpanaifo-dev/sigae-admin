export interface IUserAccess {
  id: number
  is_active: boolean
  user: number
  menu: number
  sub_menu: number | null
}

export interface IUserRole {
  id: number
  is_admin: boolean
  is_active: boolean
  user: number
  module: number
}
