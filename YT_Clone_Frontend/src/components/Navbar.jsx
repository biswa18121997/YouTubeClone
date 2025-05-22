import LargeToggle from './LargeToggle';
import SmallToggle from "./SmallToggle";
import { useState } from 'react';
import { Link } from 'react-router-dom';



export default function Navbar(){
    const [smallToggle,setSmallToggle] =useState(true);



    return(<>
    <nav className="h-20  bg-neutral-300 flex justify-between items-center ">
        <div className="flex w-1/3 m-2">
            <i onClick={()=>setSmallToggle(!smallToggle)} className="fa-solid fa-bars  text-3xl mr-4"></i>
            <Link to={'/'}>
             <div className="flex justify-center items-center">
                <i className="fa-brands fa-youtube h-full text-4xl text-red-600"></i>
                <h1 className="text-3xl font-bold font-serif">YouTube</h1>
            </div>
            </Link>
        </div>
        <div className="w-2/3 max-[33vw] flex justify-center items-center border">
            <input type="text" className=" bg-white w-3/4 p-2 rounded-2xl"/>
            <button className="w-1/4 border h-full p-1 rounded-2xl"><i className="fa-solid fa-magnifying-glass-arrow-right text-2xl"></i></button>
        </div>

        <div className="flex w-1/3 justify-around"> 
        <Link to={'/channel'}>
            <div>
                + Create / Channels
            </div>
        </Link>
            <i class="fa-solid fa-envelope"></i>
            <div className="h-10 w-10 rounded-full bg-amber-300 flex justify-center items-center">
B
            </div>
        </div>
    </nav>
        { smallToggle &&<SmallToggle />}
        {!smallToggle && <LargeToggle />}
    </>)
    
    
}