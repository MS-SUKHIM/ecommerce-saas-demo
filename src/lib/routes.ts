export const ROUTES = {
  // Shared
  HOME:           '/',
  LOGIN:          '/login',
  REGISTER:       '/register',
  FORGOT:         '/forgot-password',
  NOT_FOUND:      '/404',

  // Dashboard
  DASHBOARD:      '/dashboard',
  PRODUCTS:       '/dashboard/products',
  PRODUCT_NEW:    '/dashboard/products/new',
  PRODUCT_EDIT:   (id: string) => `/dashboard/products/${id}/edit`,
  CATEGORIES:     '/dashboard/categories',
  ORDERS:         '/dashboard/orders',
  ORDER_DETAIL:   (id: string) => `/dashboard/orders/${id}`,
  CUSTOMERS:      '/dashboard/customers',
  THEMES:         '/dashboard/themes',
  APPS:           '/dashboard/apps',
  REPORTS:        '/dashboard/reports',
  SUBSCRIPTION:   '/dashboard/subscription',
  SETTINGS:       '/dashboard/settings',
  STAFF:          '/dashboard/staff',

  // Storefront
  STORE:          '/store',
  STORE_PRODUCTS: '/store/products',
  STORE_PRODUCT:  (id: string) => `/store/products/${id}`,
  STORE_CART:     '/store/cart',
  STORE_CHECKOUT: '/store/checkout',
  STORE_ACCOUNT:  '/store/account',
  STORE_TRACK:    '/store/track',
} as const;
