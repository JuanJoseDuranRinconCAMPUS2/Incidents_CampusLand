import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Home from './components/home/Home';
import SignUpForm from './components/signUp/SignUpForm';
import SignInForm from './components/signIn/SignInForm';
import RecoveryCodeForm from './components/recoveryPassword/RecoveryCodeForm';
import NewPasswordForm from './components/newPassword/newPasswordForm';
import CamperManager from './components/incidentManager/camperManager/CamperManager';
import CmHome from './components/incidentManager/camperManager/CmHome';
import CmMyIncidents from './components/incidentManager/camperManager/CmMyIncidents';
import CmIncidents from './components/incidentManager/camperManager/CmIncidents';
import CmClassroom from './components/incidentManager/camperManager/CmClassroom';
import CmCreateIncidents from './components/incidentManager/camperManager/CmCreateIncidents';
import TrainerManager from './components/incidentManager/trainerManager/CtManager';
import CtHome from './components/incidentManager/trainerManager/CtHome';
import CtauthorizeUsers from './components/incidentManager/trainerManager/CtauthorizeUsers';

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
    path: "/RecoveryPassword",
    element: <RecoveryCodeForm/>,
    children: [
      {
        path: "NewPasswordVerification",
        element: <NewPasswordForm/>
      }
    ]
  },
  {
    path: "/Manager/Camper",
    element: <CamperManager/>,
    children: [
      {
        path: "Home",
        element: <CmHome/>
      },
      {
        path: "myIncidents",
        element: <CmMyIncidents/>
      },
      {
        path: "Incidents",
        element: <CmIncidents/>
      },
      {
        path: "classroomIncidents",
        element: <CmClassroom/>
      },
      {
        path: "CreateIncidents",
        element: <CmCreateIncidents/>
      }
    ]
  },
  {
    path: "/Manager/Trainer",
    element: <TrainerManager/>,
    children: [
      {
        path: "Home",
        element: <CtHome/>
      },
      {
        path: "myIncidents",
        element: <CmMyIncidents/>
      },
      {
        path: "Incidents",
        element: <CmIncidents/>
      },
      {
        path: "classroomIncidents",
        element: <CmClassroom/>
      },
      {
        path: "CreateIncidents",
        element: <CmCreateIncidents/>
      },
      {
        path: "authorizeUsers",
        element: <CtauthorizeUsers/>
      }
    ]
  },
  {
    path: "/SignIn",
    element: <SignInForm/>,
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