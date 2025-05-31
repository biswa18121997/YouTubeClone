import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from './components/Login.jsx'
import HomePage from './components/HomePage.jsx'
import Register from './components/Register.jsx'
import Channels from './components/Channels.jsx'
import VideoPage from './components/VideoPage.jsx'
import Downloads from './components/Downloads.jsx'
import Profile from './components/Profile.jsx'
import Subscribed from './components/Subscribed.jsx'

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
      },
      {
        path : '/channel',
        element : <Channels />
      },
      {
        path : '/video/:id',
        element : <VideoPage />
      },
      {
        path: '/downloads',
        element: <Downloads />,
      },
      {
        path : '/profile',
        element: <Profile />
      },
      {
        path : '/subscriberslist',
        element : <Subscribed />
      }
    ]

}])

createRoot(document.getElementById('root')).render(

    
     <RouterProvider router={routes}/>
  
)
