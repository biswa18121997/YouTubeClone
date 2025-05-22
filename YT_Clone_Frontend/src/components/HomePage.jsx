import { Link } from "react-router-dom"
import { useFetch } from "../../utils/Fetch.js"
import VideoPreviewCard from "./VideoPreviewCard.jsx";

export default function HomePage(){

    let url ='https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&chart=mostPopular&regionCode=IN&maxResults=20&key=AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY'
    let {data,error,loading} = useFetch(url);

    console.log(data);



    return(<div className="w-[80vw] relative left-[18vw] h-screen">
        <div className="flex flex-col justify-center items-center h-1/2 ">

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
        
        
        </div>
        <h1 className="text-center">Videos Trending on Youtube :</h1>
        <hr />
        <div className="grid grid-cols-3 grid-rows-3 w-full gap-2">
            
            {data?.items?.map((items)=> <VideoPreviewCard item={items} />)}
        
        
        </div>
        
        </div>)
}


//yt api key=   AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY