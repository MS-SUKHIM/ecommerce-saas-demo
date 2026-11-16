export const APP_NAME = 'دكان';
export const APP_TAGLINE = 'ابنِ متجرك، حقق نجاحك';

export const ORDER_STATUSES = {
  pending:    { label: 'معلق',           color: 'yellow' },
  confirmed:  { label: 'مؤكد',           color: 'blue' },
  processing: { label: 'قيد التجهيز',   color: 'purple' },
  shipped:    { label: 'تم الشحن',       color: 'indigo' },
  delivered:  { label: 'تم التوصيل',    color: 'green' },
  cancelled:  { label: 'ملغي',           color: 'red' },
  refunded:   { label: 'مُسترد',         color: 'gray' },
} as const;

export const PRODUCT_STATUSES = {
  active:       { label: 'نشط',          color: 'green' },
  inactive:     { label: 'معطل',         color: 'gray' },
  out_of_stock: { label: 'نفذ المخزون', color: 'red' },
  draft:        { label: 'مسودة',        color: 'yellow' },
} as const;

export const USER_ROLES = {
  platform_admin: 'مشرف المنصة',
  merchant_owner: 'صاحب المتجر',
  merchant_staff: 'موظف',
  customer:       'عميل',
} as const;

export const PLANS = [
  { id: 'basic', name: 'الأساسية', price: 99, products: 100, storage: '1 GB', apps: 0 },
  { id: 'pro',   name: 'الاحترافية', price: 299, products: 2000, storage: '20 GB', apps: 5 },
  { id: 'enterprise', name: 'المؤسسية', price: 799, products: -1, storage: '500 GB', apps: -1 },
] as const;

export const PAGE_SIZE = 10;
