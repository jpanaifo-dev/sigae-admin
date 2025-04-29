'use server'
import { IUserAccess, IResApi, IUserAccessList } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'
import { fetchMenu } from './menu'
import { fetchSubMenu } from './sub-menu'

const API_BASE = ENDPOINTS_CONFIG.MODULES

const DATA_DEFAULT: IResApi<IUserAccess> = {
  count: 0,
  next: null,
  previous: null,
  results: []
}
const DATA_DEFAULT_ACCESS: IResApi<IUserAccessList> = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

export const fetchUsersAccess = async (): Promise<IResApi<IUserAccess>> => {
  const url = `${API_BASE.USER_ACCESS}`

  try {
    const response = await fetchUserService.get(url)

    if (!response.ok) {
      return DATA_DEFAULT
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResApi<IUserAccess> = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return DATA_DEFAULT
  }
}

export const fetchUserAccessById = async (
  id: string
): Promise<IResApi<IUserAccess>> => {
  const url = `${API_BASE.USER_ACCESS}${id}/`

  try {
    const response = await fetchUserService.get(url)

    if (!response.ok) {
      return DATA_DEFAULT
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResApi<IUserAccess> = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return DATA_DEFAULT
  }
}

export const fetchUserAccessByUserId = async (
  id: string
): Promise<IResApi<IUserAccessList>> => {
  const url = `${API_BASE.USER_ACCESS}`

  try {
    const response = await fetchUserService.get(url)
    // test fetching
    const menusLis = await fetchMenu()
    const subMenusList = await fetchSubMenu()

    if (!response.ok) {
      return DATA_DEFAULT_ACCESS
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData = await response.json()
    const filteredData = responseData.filter(
      (item: IUserAccess) => Number(item.user) === Number(id)
    )

    // crear la lista con nueva estructura
    const newData = filteredData.map((item: IUserAccess) => {
      const menu = menusLis?.data?.find((menuItem) => menuItem.id === item.menu)
      const subMenu = subMenusList.data?.find(
        (subMenuItem) => subMenuItem.id === item.sub_menu
      )

      return {
        ...item,
        menu: menu || null,
        sub_menu: subMenu || null
      }
    })

    return {
      count: newData.length,
      next: null,
      previous: null,
      results: newData
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return DATA_DEFAULT_ACCESS
  }
}
