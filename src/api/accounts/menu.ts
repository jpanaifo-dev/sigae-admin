'use server'
import { IMenuList } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'
import { MenuFormSchemaType } from '@/modules/modulos/components/menu-form/menu.schema'
import { revalidatePath } from 'next/cache'

const API_BASE = ENDPOINTS_CONFIG.MODULES

export const fetchMenu = async (): Promise<{
  status: number
  data?: IMenuList[]
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

export async function createOrUpdateMenu({
  data,
  id,
  revalidateUrl
}: {
  data: MenuFormSchemaType
  id?: number
  revalidateUrl?: string
}): Promise<{
  status: number
  data?: IMenuList | null
  errors?: string[]
  revalidateUrl?: string
}> {
  const url = id ? `${API_BASE.MENU}/${id}/` : API_BASE.MENU

  try {
    const response = id
      ? await fetchUserService.put(url, data)
      : await fetchUserService.post(url, data)

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
    const responseData = await response.json()
    revalidatePath(revalidateUrl ?? '/admin/modules')
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
