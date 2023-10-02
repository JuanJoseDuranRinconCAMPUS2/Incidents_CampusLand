import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Home from './components/home/Home';
import SignUpForm from './components/signUp/SignUpForm';
import Error404 from './components/error404';

const root = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
   
  },
  {
    path: "/SignUp",
    element: <SignUpForm/>,
  },

  {
    path: "*",
    element: <Error404/>,
  },
]);

let app = document.querySelector('#root')
ReactDOM.createRoot(app).render(
  <React.StrictMode>
    <RouterProvider router={root}/>
  </React.StrictMode>,
)