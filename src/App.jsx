import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './components/store/store';
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
    path: "/dashboard",
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
    path: "/products",
    element: (
      <WithSidebarLayout>
        <Product />
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
    path : "/new/product",
    element : (
      <WithSidebarLayout>
        <AddNewProduct />
      </WithSidebarLayout>
    ),
  }
]);

function App() {
  return (
    <Provider store={store}>
      <div className='app'>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;