import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from './components/Login.jsx'
import HomePage from './components/HomePage.jsx'
import Register from './components/Register.jsx'

const routes=createBrowserRouter([{
    path:"/",
    element:<App/>,
    children :[
      {
        path : '/',
        element : <HomePage />
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path : '/register',
        element : <Register />
      }
    ]

}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
     <RouterProvider router={routes}/>
  </StrictMode>,
)
