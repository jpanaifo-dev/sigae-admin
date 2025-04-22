'use server'
import { ISectionMenu } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'

const API_BASE = ENDPOINTS_CONFIG.MODULES

export const fetchMenu = async (): Promise<{
  status: number
  data?: ISectionMenu[]
  errors?: string[]
}> => {
  const url = `${API_BASE.MENU}`

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
