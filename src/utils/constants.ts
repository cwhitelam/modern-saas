// General constants
export const isProduction = process.env.NODE_ENV === 'production'
export const CALLBACK_URL = isProduction ? process.env.DEPLOYED_URL : process.env.LOCAL_URL
export const SERVICE_URL = isProduction ? process.env.DEPLOYED_URL : process.env.LOCAL_URL

// Route constants
export const ADMIN_PAGE = '/admin'
export const DASHBOARD_PAGE = '/dashboard'
