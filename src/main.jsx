import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from './components/home/Home';

const root = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
   
  },
]);

let app = document.querySelector('#root')
ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <RouterProvider router={root}/>
  </React.StrictMode>,
)