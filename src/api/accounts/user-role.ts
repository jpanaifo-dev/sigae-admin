'use server'
import { IUserRole, IResApi } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'

const API_BASE = ENDPOINTS_CONFIG.MODULES

const DATA_DEFAULT: IResApi<IUserRole> = {
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
): Promise<IResApi<IUserRole>> => {
  const url = `${API_BASE.USER_ROLE}`

  try {
    const response = await fetchUserService.get(url)

    if (!response.ok) {
      return DATA_DEFAULT
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData = await response.json()
    const filteredData = responseData.results.filter(
      (item: IUserRole) => item.user === Number(id)
    )
    return {
      count: filteredData.length,
      next: null,
      previous: null,
      results: filteredData
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return DATA_DEFAULT
  }
}
