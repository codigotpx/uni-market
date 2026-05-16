import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider ,createBrowserRouter } from "react-router";
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop'
import Register from './pages/register';
import Contact from './pages/Contact';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/shop',
        element: <Shop/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
