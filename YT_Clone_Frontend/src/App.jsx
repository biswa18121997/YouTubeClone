import LargeToggle from "./components/LargeToggle"
import Navbar from "./components/Navbar"
import SmallToggle from "./components/SmallToggle"
import HomePage from './components/HomePage'
import Login from "./components/Login"
import { Outlet } from "react-router-dom"


function App() {
  

  return (
    <>
      <Navbar/>
      <Outlet />
      {/* <Login /> */}
    </>
  )
}

export default App
