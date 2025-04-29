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
  },
  USERS: {
    URL_BASE: `${URL_BASE}/usuarios`,
    LIST: `${URL_BASE}/usuarios/lista`,
    CREATE: `${URL_BASE}/usuarios/crear`,
    EDIT: (id: string) => `${URL_BASE}/usuarios/editar/${id}`,
    DETAIL: (id: string) => `${URL_BASE}/usuarios/${id}`,
    PERMISSIONS: (id: string) => `${URL_BASE}/usuarios/${id}/accesos`,
    ROLES: (id: string) => `${URL_BASE}/usuarios/${id}/roles`,
    LOGS: (id: string) => `${URL_BASE}/usuarios/${id}/logs`
  }
}
