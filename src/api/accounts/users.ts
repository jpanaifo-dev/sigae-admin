'use server'
import { IUserList, IResApi } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'

const API_BASE = ENDPOINTS_CONFIG.MODULES

const DATA_DEFAULT: IResApi<IUserList> = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

export const fetchUsers = async (): Promise<{
  status: number
  data?: IResApi<IUserList>
  errors?: string[]
}> => {
  const url = `${API_BASE.USER}`

  try {
    const response = await fetchUserService.get(url)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: DATA_DEFAULT
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData = await response.json()
    return {
      status: response.status,
      data: {
        count: responseData.count,
        next: null,
        previous: null,
        results: responseData
      }
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: DATA_DEFAULT
    }
  }
}

export const fetchUserById = async (
  id: string
): Promise<{
  status: number
  data?: IUserList | null
  errors?: string[]
}> => {
  const url = `${API_BASE.USER}${id}/`

  try {
    const response = await fetchUserService.get(url)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: null
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IUserList = await response.json()
    return {
      status: response.status,
      data: responseData
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: null
    }
  }
}
