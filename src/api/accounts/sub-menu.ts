'use server'
import { ISubMenuList } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'
import { revalidatePath } from 'next/cache'
import { SubmenuFormData } from '@/modules/modulos/components/submenu-form/submenu.schema'

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

export async function createOrUpdateSubMenu({
  data,
  id_subMenu,
  urlValidate
}: {
  id_subMenu: string
  data: SubmenuFormData
  urlValidate?: string
}): Promise<{
  status: number
  data?: ISubMenuList | null
  errors?: string[]
}> {
  const url = id_subMenu
    ? `${API_BASE.SUBMENU}${id_subMenu}/`
    : API_BASE.SUBMENU

  try {
    const response = id_subMenu
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
    const responseData: ISubMenuList = await response.json()
    if (responseData && urlValidate) {
      revalidatePath(urlValidate)
    }
    return {
      status: response.status,
      data: responseData,
      errors: []
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
