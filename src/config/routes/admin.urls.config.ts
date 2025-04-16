const URL_BASE = '/admin'

export const ADMIN_URLS_APP = {
  BASE: {
    URL_BASE: `${URL_BASE}`,
    UNAUTHORIZED: `/unauthorized`,
    DASHBOARD: `${URL_BASE}/dashboard`,
  },
  LOGIN: {
    URL_BASE: `/auth`,
    LOGOUT: `${URL_BASE}/logout`,
  },
}
