import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import NotFoundPage from "./pages/NotFoundPage";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import WithSidebarLayout from './components/layouts/WithSidebarLayout';
import WithoutSidebarLayout from './components/layouts/WithoutSidebarLayout';
import ProductCategory from './pages/ProductCategory';
import Product from './components/product/Product';
import UserManagement from './pages/UserManagement';
import OrderedProduct from './pages/OrderedProduct';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/reset-password/ResetPassword';
import AddNewProduct from './components/product/AddNewProduct';
import SavorySeasoning from './pages/SavorySeasoning';
import Spices from './pages/Spices';
import AddProductCategory from './components/product-category/AddProductCategory';
import Cart from './pages/Cart';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Toast from './components/layouts/Toast';
import AddNewUser from './components/User Management/AddNewUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/config/store';
import ViewProductCategory from './components/product-category/ViewProductCategory';
import ViewProduct from './components/product/ViewProduct';
import UpdateProductCategory from './components/product-category/UpdateProductCategory';

const productData = {
  name: "Example product Name",
  description: "This is an example description that will be for the category",
  price : "This is a sample price of $50",
  availability : "This is available",
  quantity : "50", 
  category : "type of category",
  imageurl : "Sample image",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <WithoutSidebarLayout>
        <Home />
      </WithoutSidebarLayout>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: (
      <WithoutSidebarLayout>
        <Login />
      </WithoutSidebarLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <WithoutSidebarLayout>
        <Register />
      </WithoutSidebarLayout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <WithoutSidebarLayout>
        <ForgotPassword />
      </WithoutSidebarLayout>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <WithoutSidebarLayout>
        <ResetPassword />
      </WithoutSidebarLayout>
    ),
  },
  {
    path: "/products/savory",
    element: (
      <WithoutSidebarLayout>
        <SavorySeasoning />
      </WithoutSidebarLayout>
    ),
  },
  {
    path: "/products/spices",
    element: (
      <WithoutSidebarLayout>
        <Spices />
      </WithoutSidebarLayout>
    ),
  },
  {
    path: "/contact",
    element: (
      <WithoutSidebarLayout>
        <Contact />
      </WithoutSidebarLayout>
    ),
  },
  {
    path: "/cart",
    element: (
      <WithoutSidebarLayout>
        <Cart />
      </WithoutSidebarLayout>
    ),
  },
  {
    path: "/dashboard", // took out the AuthenticatedRoute, it was wrapping everything
    element: (
        <WithSidebarLayout>
          <Dashboard />
        </WithSidebarLayout>
    ),
  },
  {
    path: "/product/category",
    element: (
        <WithSidebarLayout>
          <ProductCategory />
        </WithSidebarLayout>
    ),
  },
  {
    path: "/new/product/category",
    element: (
        <WithSidebarLayout>
          <AddProductCategory />
        </WithSidebarLayout>
    ),
  },
  {
    path:  "/view/product/category/:id",
    element: (
      <WithSidebarLayout>
        <ViewProductCategory />
      </WithSidebarLayout>
    ),
  },
  {
    path:  "/update/product/category/:id",
    element: (
      <WithSidebarLayout>
        <UpdateProductCategory />
      </WithSidebarLayout>
    ),
  },
  {
    path: "/products",
    element: (
        <WithSidebarLayout>
          <Product />
        </WithSidebarLayout>
    ),
  },
  {
    path:  "/view/product/:id",
    element: (
      <WithSidebarLayout>
        <ViewProduct product={productData } />
      </WithSidebarLayout>
    ),
  },
  {
    path: "/user/management",
    element: (
        <WithSidebarLayout>
          <UserManagement />
        </WithSidebarLayout>
    ),
  },
  {
    path: "/ordered/products",
    element: (
        <WithSidebarLayout>
          <OrderedProduct />
        </WithSidebarLayout>
    ),
  },
  {
    path: "/new/product",
    element: (
        <WithSidebarLayout>
          <AddNewProduct />
        </WithSidebarLayout>
    ),
  },
  {
    path: "/new/user",
    element: (
        <WithSidebarLayout>
          <AddNewUser />
        </WithSidebarLayout>
    ),
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
        <Provider store={store} >
          <PersistGate loading={null} persistor={persistor}>
            <Toast />
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
