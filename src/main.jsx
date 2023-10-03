import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Home from './components/home/Home';
import SignUpForm from './components/signUp/SignUpForm';
import Error404 from './components/error404';
import ModalInfo from './components/ModalInfo';

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

let appM = document.querySelector('#modal')
ReactDOM.createRoot(appM).render(
  <React.StrictMode>
    <ModalInfo/>
  </React.StrictMode>,
)