export const CALLBACK_URL = process.env.production
  ? 'https://modern-saas-dev.herokuapp.com'
  : 'http://localhost:3000'

export const USER_ROLES = {
  ADMIN: 'ADMIN'
}

export const ADMIN_PAGE = '/admin'
