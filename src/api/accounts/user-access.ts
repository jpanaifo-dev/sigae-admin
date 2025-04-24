'use server'
import { IUserAccess, IResApi } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'

const API_BASE = ENDPOINTS_CONFIG.MODULES

const DATA_DEFAULT: IResApi<IUserAccess> = {
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
): Promise<IResApi<IUserAccess>> => {
  const url = `${API_BASE.USER_ACCESS}`

  try {
    const response = await fetchUserService.get(url)

    if (!response.ok) {
      return DATA_DEFAULT
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData = await response.json()
    const filteredData = responseData.filter(
      (item: IUserAccess) => Number(item.user) === Number(id)
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
