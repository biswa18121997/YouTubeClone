import { Link } from "react-router-dom"
import { useFetch } from "../utils/Fetch.js"
import VideoPreviewCard from "./VideoPreviewCard.jsx";
import FetchLocal from "../utils/FetchLocal.js";
import {UserContext} from '../utils/Context.jsx';
import { useContext } from 'react';

export default function HomePage(){
const API_KEY_2 = 'AIzaSyANrQ1rFYCVFXKpLcuqYnQ7yLuzOcxbMy8';
const API_KEY = 'AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY'
    let url =`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=IN&maxResults=20&key=${API_KEY_2}`
    let {data,error,loading} = useFetch(url);
   let {user} = useContext(UserContext);

  

    return(<div className="w-[80vw] relative left-[18vw] h-screen top-[15vh]">
        <section className="flex flex-wrap justify-around">
            <p className="p-1 m-1 border rounded-2xl">Trending on Youtube</p>
            <p className="p-1 m-1 border rounded-2xl">Videos Based on Past Watches</p>
            <p className="p-1 m-1 border rounded-2xl">Videos based on Your Likes</p>
            <p className="p-1 m-1 border rounded-2xl">Action</p>
            <p className="p-1 m-1 border rounded-2xl">Adventure</p>
            <p className="p-1 m-1 border rounded-2xl">Movies/ Entertainment</p>
        </section>
       {!user &&  <div className="flex flex-col justify-center items-center h-1/2 ">

      <div className="flex flex-col justify-center items-center border p-4 m-4">
            <h1>Please Login or / Register to view more personalied content..</h1>
            <i class="fa-solid fa-user border-2 p-2 m-2 rounded-2xl text-3xl"></i>
            <Link to={'/login'}>
                 <button className="p-2 m-2 border rounded-2xl"> Log In</button>
            </Link>
            <Link to={'/register'}>
                <button className="p-2  border rounded-2xl"> Register</button>
            </Link>
            
        </div>
        
        
        </div>}
        <h1 className="text-center">Trending</h1>
        <hr />
        <div className="grid grid-cols-3 grid-rows-3 w-full gap-2">
            
            {data?.items?.map((items)=> <VideoPreviewCard item={items} />)}
        
        
        </div>
        <div>
            
        </div>
        
        </div>)
}


// yt api key=   AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY