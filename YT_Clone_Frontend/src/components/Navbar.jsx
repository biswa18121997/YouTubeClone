import LargeToggle from './LargeToggle';
import SmallToggle from "./SmallToggle";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../utils/Context.jsx';
import { useContext } from 'react';



export default function Navbar(){
    let navigate = useNavigate();
    const [smallToggle,setSmallToggle] =useState(true);
    let {user, profile, token} = useContext(UserContext);
    let {setData}  = useContext(UserContext);
    function signOut(){
        localStorage.clear();
        setData({ user:{}, profile:{} ,token: {}});        
        navigate('/login');

    }
  


    return(<>
    <nav className="h-20 z-50  bg-black flex justify-between items-center fixed top-0 w-screen">
        <div className="flex w-1/3 m-2">
            <i onClick={()=>setSmallToggle(!smallToggle)} className="fa-solid fa-bars  text-3xl mr-4"></i>
            <Link to={'/'}>
             <div className="flex justify-center items-center">
                <i className="fa-brands fa-youtube h-full text-4xl text-red-600"></i>
                <h1 className="text-3xl font-bold font-serif">YouTube</h1>
            </div>
            </Link>
        </div>
        <div className="w-1/3 max-[33vw] flex justify-center items-center border">
            <input type="text" className=" bg-white w-4/5 p-2 rounded-2xl"/>
            <button className="w-1/5 border h-full p-1 rounded-2xl"><i className="fa-solid fa-magnifying-glass-arrow-right text-2xl"></i></button>
        </div>
        <Link to={'/channel'}>
                <div className='p-2 m-2 border rounded-2xl ml-16 w-[10vw] text-wrap'>
                    +Create/Channels
                </div>
        </Link>
         <i class="fa-solid fa-bell"></i>
        <div className="flex w-1/3 justify-center items-center gap-5"> 
            
           
            <div className='p-2 flex flex-row-reverse gap-2 invisible md:visible'>
                 <Link to={'/profile'}>
                    <img className='h-10 w-10 border bg-cover bg-center rounded-full' src={user?.picture} alt="" />    
                    <h1>{user?.name}</h1>
                </Link>
                <Link to={localStorage.getItem('userAuth')?'':'/login'}>
                    <button onClick={signOut} className='p-1 m-1 border rounded-2xl text-sm'> <i class="fa-solid fa-right-from-bracket"></i> {localStorage.getItem('userAuth')? "LogOut" : "Log In"}</button>
                </Link>
            </div>
           
        </div>
        
    </nav>
        { smallToggle &&<SmallToggle />}
        {!smallToggle && <LargeToggle />}
    </>)
    
    
}