'use server'
import { ISectionMenu } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/modules'
import { fetchUserService } from '../core'
//Observation
import { SectionFormValues } from '@/modules/modulos/components/section-form/section.schema'
import { revalidatePath } from 'next/cache'

const API_BASE = ENDPOINTS_CONFIG.MODULES

export const fetchSectionMenu = async (): Promise<{
  status: number
  data?: ISectionMenu[]
  errors?: string[]
}> => {
  const url = `${API_BASE.SECTION_MENU}`

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

export async function createOrUpdateSectionMenu({
  data,
  id_section,
  urlRevalidate = '/admin/modulos/'
}: {
  data: SectionFormValues
  id_section?: string
  urlRevalidate?: string
}): Promise<{
  status: number
  data?: ISectionMenu | null
  errors?: string[]
}> {
  const url = id_section
    ? `${API_BASE.SECTION_MENU}${id_section}/`
    : API_BASE.SECTION_MENU

  try {
    const response = id_section
      ? await fetchUserService.patch(url, data)
      : await fetchUserService.post(url, data)

    if (!response?.ok) {
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
    const responseData: ISectionMenu = await response.json()
    revalidatePath(urlRevalidate)
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
