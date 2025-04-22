'use server'
import { ISubMenuList } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'

const API_BASE = ENDPOINTS_CONFIG.MODULES

export const fetchSubMenu = async (): Promise<{
  status: number
  data?: ISubMenuList[]
  errors?: string[]
}> => {
  const url = `${API_BASE.SUBMENU}`

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
