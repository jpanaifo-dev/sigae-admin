'use server'
import { IModule } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'

const API_BASE = ENDPOINTS_CONFIG.MODULES

export const fetchModules = async (): Promise<{
  status: number
  data?: IModule[]
  errors?: string[]
}> => {
  const url = `${API_BASE.MODULE}`

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
        data: []
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: [] = await response.json()
    return {
      status: response.status,
      data: responseData
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: []
    }
  }
}

export const fetchModuleById = async (
  id: string
): Promise<{
  status: number
  data?: IModule | null
  errors?: string[]
}> => {
  const url = `${API_BASE.MODULE}${id}`

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
    const responseData: IModule = await response.json()
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
