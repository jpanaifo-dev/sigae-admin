export const configApps = {
  'panel-admin': {
    name: 'Panel de administración de EPG - UNAP',
    color: '#002E62',
  },
  academic: {
    name: 'Académicos',
    color: '#27272A',
  },
  economic: {
    name: 'Económicos',
    color: '#004D40',
  },
  docs: {
    name: 'Documentación',
    color: '#2C2C2C',
  },
  'panel-admin-admision': {
    name: 'Panel de administración de admisión - UNAP',
    color: '#002E62',
  },
}

export type MenuConfigApps = keyof typeof configApps
