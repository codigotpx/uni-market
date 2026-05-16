import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider ,createBrowserRouter } from "react-router";
import Layout from './components/Layout';
import Home from './pages/home/Home';
import Shop from './pages/Shop'


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
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
