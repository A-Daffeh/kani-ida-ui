import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import SavorySeasoning from "./components/product/SavorySeasoning";
import Spices from "./components/product/Spices";
import NotFoundPage from "./pages/NotFoundPage";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import WithSidebarLayout from './components/layouts/WithSidebarLayout';
import WithoutSidebarLayout from './components/layouts/WithoutSidebarLayout';
import ProductCategory from './pages/ProductCategory';
import Product from './pages/Product';
import UserManagement from './pages/UserManagement';
import OrderedProduct from './pages/OrderedProduct';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/reset-password/ResetPassword';
import AddNewProduct from './pages/AddNewProduct';

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
    path: "/dashboard",
    element: (
      <WithSidebarLayout>
        <Dashboard />
      </WithSidebarLayout>
    ),
  },
  {
    path: "/product-category",
    element: (
      <WithSidebarLayout>
        <ProductCategory />
      </WithSidebarLayout>
    ),
  },
  {
    path: "/add-products",
    element: (
      <WithSidebarLayout>
        <Product />
      </WithSidebarLayout>
    ),
  },
  {
    path: "/user-management",
    element: (
      <WithSidebarLayout>
        <UserManagement />
      </WithSidebarLayout>
    ),
  },
  {
    path: "/ordered-products",
    element: (
      <WithSidebarLayout>
        <OrderedProduct />
      </WithSidebarLayout>
    ),
  },

  {
    path : "/Add-new-product",
    element : (
      <WithSidebarLayout>
      <AddNewProduct />
    </WithSidebarLayout>

    ),
  }

]);

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
