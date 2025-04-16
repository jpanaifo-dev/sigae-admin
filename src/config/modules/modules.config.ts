export const SERVICES_MODULES = {
  USER: {
    URL_PROD: process.env.APP_API_USER_SERVICE,
    URL_LOCAL: process.env.APP_API_USER_SERVICE_LOCAL,
    TOKEN: process.env.APP_TOKEN_USER,
  },
  ADMIN: {
    URL_PROD: process.env.APP_API_USER_SERVICE,
    URL_LOCAL: process.env.APP_API_USER_SERVICE_LOCAL,
    TOKEN: process.env.APP_TOKEN_ADMIN,
  },
  PERSON: {
    URL_PROD: process.env.APP_API_PERSON_SERVICE,
    URL_LOCAL: process.env.APP_API_PERSON_SERVICE_LOCAL,
    TOKEN: process.env.APP_TOKEN_PERSON,
  },
  CORE: {
    URL_PROD: process.env.APP_API_CORE_SERVICE,
    URL_LOCAL: process.env.APP_API_CORE_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  ADMISION: {
    URL_PROD: process.env.APP_API_ADMISSION_SERVICE,
    URL_LOCAL: process.env.APP_API_ADMISSION_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  PROGRAM: {
    URL_PROD: process.env.APP_API_PROGRAM_SERVICE,
    URL_LOCAL: process.env.APP_API_PROGRAM_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  FILE: {
    URL_PROD: process.env.APP_API_FILE_SERVICE,
    URL_LOCAL: process.env.APP_API_FILE_SERVICE_LOCAL,
    TOKEN: undefined,
  },
  REPORT: {
    URL_PROD: process.env.APP_API_REPORT_SERVICE,
    URL_LOCAL: process.env.APP_API_REPORT_SERVICE_LOCAL,
    TOKEN: undefined,
  },
}

export type ServicesModulesType = typeof SERVICES_MODULES
