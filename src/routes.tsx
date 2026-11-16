import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoadingSpinner from './components/shared/LoadingSpinner';

const wrap = (C: React.ComponentType) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
    <C />
  </Suspense>
);

const LandingPage           = lazy(() => import('./pages/shared/LandingPage'));
const LoginPage             = lazy(() => import('./pages/shared/LoginPage'));
const RegisterPage          = lazy(() => import('./pages/shared/RegisterPage'));
const ForgotPasswordPage    = lazy(() => import('./pages/shared/ForgotPasswordPage'));
const ResetPasswordPage     = lazy(() => import('./pages/shared/ResetPasswordPage'));
const VerifyEmailPage       = lazy(() => import('./pages/shared/VerifyEmailPage'));
const NotFoundPage          = lazy(() => import('./pages/shared/NotFoundPage'));

const MerchantDashboard     = lazy(() => import('./pages/dashboard/MerchantDashboard'));
const ProductsPage          = lazy(() => import('./pages/dashboard/ProductsPage'));
const ProductFormPage       = lazy(() => import('./pages/dashboard/ProductFormPage'));
const OrdersPage            = lazy(() => import('./pages/dashboard/OrdersPage'));
const CustomersPage         = lazy(() => import('./pages/dashboard/CustomersPage'));
const ThemesPage            = lazy(() => import('./pages/dashboard/ThemesPage'));
const AppsPage              = lazy(() => import('./pages/dashboard/AppsPage'));
const ReportsPage           = lazy(() => import('./pages/dashboard/ReportsPage'));
const SubscriptionPage      = lazy(() => import('./pages/dashboard/SubscriptionPage'));
const StoreSettingsPage     = lazy(() => import('./pages/dashboard/StoreSettingsPage'));
const StaffPage             = lazy(() => import('./pages/dashboard/StaffPage'));
const TwoFactorChallengePage = lazy(() => import('./pages/dashboard/TwoFactorChallengePage'));

const StoreHomePage            = lazy(() => import('./pages/storefront/StoreHomePage'));
const StoreProductsPage        = lazy(() => import('./pages/storefront/StoreProductsPage'));
const StoreProductDetailPage = lazy(() => import('./pages/storefront/StoreProductDetailPage'));
const StoreCartPage            = lazy(() => import('./pages/storefront/StoreCartPage'));
const StoreCheckoutPage        = lazy(() => import('./pages/storefront/StoreCheckoutPage'));
const StoreAccountPage         = lazy(() => import('./pages/storefront/StoreAccountPage'));
const StoreTrackOrderPage      = lazy(() => import('./pages/storefront/StoreTrackOrderPage'));

export const router = createBrowserRouter([
  { path: '/',                        element: wrap(LandingPage) },
  { path: '/login',                   element: wrap(LoginPage) },
  { path: '/register',                element: wrap(RegisterPage) },
  { path: '/forgot-password',         element: wrap(ForgotPasswordPage) },
  { path: '/reset-password',          element: wrap(ResetPasswordPage) },
  { path: '/email/verify',            element: wrap(VerifyEmailPage) },
  { path: '/two-factor-challenge',    element: wrap(TwoFactorChallengePage) },

  { path: '/dashboard',               element: wrap(MerchantDashboard) },
  { path: '/dashboard/products',         element: wrap(ProductsPage) },
  { path: '/dashboard/products/new',     element: wrap(ProductFormPage) },
  { path: '/dashboard/products/:id/edit',element: wrap(ProductFormPage) },
  { path: '/dashboard/orders',           element: wrap(OrdersPage) },
  { path: '/dashboard/customers',        element: wrap(CustomersPage) },
  { path: '/dashboard/themes',           element: wrap(ThemesPage) },
  { path: '/dashboard/apps',             element: wrap(AppsPage) },
  { path: '/dashboard/reports',          element: wrap(ReportsPage) },
  { path: '/dashboard/subscription',     element: wrap(SubscriptionPage) },
  { path: '/dashboard/settings',         element: wrap(StoreSettingsPage) },
  { path: '/dashboard/staff',            element: wrap(StaffPage) },

  { path: '/store',                         element: wrap(StoreHomePage) },
  { path: '/store/products',                element: wrap(StoreProductsPage) },
  { path: '/store/products/:id',            element: wrap(StoreProductDetailPage) },
  { path: '/store/cart',                    element: wrap(StoreCartPage) },
  { path: '/store/checkout',                element: wrap(StoreCheckoutPage) },
  { path: '/store/account',                 element: wrap(StoreAccountPage) },
  { path: '/store/track',                   element: wrap(StoreTrackOrderPage) },

  { path: '/404',                           element: wrap(NotFoundPage) },
  { path: '*',                              element: <Navigate to="/404" replace /> },
]);