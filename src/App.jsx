import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import SavorySeasoning from "./components/product/SavorySeasoning";
import Spices from "./components/product/Spices";
import NotFoundPage from "./pages/NotFoundPage";
import Contact from "./components/contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/products/savory",
    element: <SavorySeasoning />,
  },
  {
    path: "/products/spices",
    element: <Spices />,
  },

  {
    path : "/contact",
    element : <Contact />
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