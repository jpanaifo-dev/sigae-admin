const URL_BASE = '/admin'

export const ADMIN_URLS_APP = {
  BASE: {
    URL_BASE: `${URL_BASE}`,
    UNAUTHORIZED: `/unauthorized`,
    DASHBOARD: `${URL_BASE}/dashboard`
  },
  LOGIN: {
    URL_BASE: `/auth`,
    LOGOUT: `${URL_BASE}/logout`
  },
  MODULES: {
    URL_BASE: `${URL_BASE}/modulos`,
    LIST: `${URL_BASE}/modulos/lista`,
    CREATE: `${URL_BASE}/modulos/crear`,
    EDIT: (id: string) => `${URL_BASE}/modulos/editar/${id}`,
    DETAIL: (id: string) => `${URL_BASE}/modulos/${id}`
  }
}
