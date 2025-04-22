export interface IMenuList {
  id: number
  name: string
  description: string
  icon: string
  url: null | string
  is_active: boolean
  section: number
}

export interface ISubMenuList {
  id: number
  name: string
  description: string
  icon: string
  url: string
  is_active: boolean
  menu: number
}

export interface ISectionMenu {
  id: number
  name: string
  module: number
}
