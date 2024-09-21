import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Loader from './ui/Loader';
import ProtectRoute from './ui/ProtectRoute';

const AppLayout = lazy(() => import('./ui/AppLayout'));
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const PurchaseCancel = lazy(() => import('./pages/PurchaseCancel'));
const PurchaseSuccess = lazy(() => import('./pages/PurchaseSuccess'));
const Cart = lazy(() => import('./pages/Cart'));
const Admin = lazy(() => import('./pages/Admin'));
const ProductList = lazy(
  () => import('./features/dashboard/components/ProductList')
);
const AnalyticsTab = lazy(
  () => import('./features/dashboard/components/AnalyticsTab')
);
const CreateProductForm = lazy(
  () => import('./features/dashboard/components/CreateProductForm')
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      stateTime: 0,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to='home' />} />
              <Route path='home' element={<Home />} />
              <Route path='category/:category' element={<Category />} />
              <Route element={<ProtectRoute />}>
                <Route path='cart' element={<Cart />} />
                <Route path='/purchase-success' element={<PurchaseSuccess />} />
                <Route path='/purchase-cancel' element={<PurchaseCancel />} />
                <Route path='dashboard' element={<Admin />}>
                  <Route
                    index
                    element={<Navigate replace to='create-product' />}
                  />
                  <Route
                    path='create-product'
                    element={<CreateProductForm />}
                  />
                  <Route path='products' element={<ProductList />} />
                  <Route path='analytics' element={<AnalyticsTab />} />
                </Route>
              </Route>

              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position='top-center'
        gutter={8}
        toastOptions={{
          className:
            'max-w-md px-4 py-3 bg-yellow-50 text-yellow-900 text-center',
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
