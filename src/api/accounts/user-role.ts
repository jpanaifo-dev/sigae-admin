'use server'
import { IUserRole, IResApi, IUserRoleList } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'
import { fetchModules } from './modules'

const API_BASE = ENDPOINTS_CONFIG.MODULES

const DATA_DEFAULT: IResApi<IUserRole> = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

const DATA_DEFAULTLIST: IResApi<IUserRoleList> = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

export const fetchUsersRoles = async (): Promise<IResApi<IUserRole>> => {
  const url = `${API_BASE.USER_ROLE}`

  try {
    const response = await fetchUserService.get(url)

    if (!response.ok) {
      return DATA_DEFAULT
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResApi<IUserRole> = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return DATA_DEFAULT
  }
}

export const fetchUserRoleById = async (
  id: string
): Promise<IResApi<IUserRole>> => {
  const url = `${API_BASE.USER_ROLE}${id}/`

  try {
    const response = await fetchUserService.get(url)

    if (!response.ok) {
      return DATA_DEFAULT
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResApi<IUserRole> = await response.json()
    return responseData
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return DATA_DEFAULT
  }
}

export const fetchUserRoleByUserId = async (
  id: string
): Promise<IResApi<IUserRoleList>> => {
  const url = `${API_BASE.USER_ROLE}`

  try {
    const response = await fetchUserService.get(url)
    const modulesList = await fetchModules()
    const modules = modulesList.data

    if (!response.ok) {
      return DATA_DEFAULTLIST
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData = await response.json()
    const filteredData = responseData.filter(
      (item: IUserRole) => Number(item.user) === Number(id)
    )

    const results = filteredData.map((item: IUserRoleList) => {
      const matchedModule = modules?.find(
        (mod) => mod?.id === Number(item?.module)
      )
      return {
        ...item,
        module: matchedModule ? { ...matchedModule } : null
      }
    })

    return {
      count: results.length,
      next: null,
      previous: null,
      results
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return DATA_DEFAULTLIST
  }
}
