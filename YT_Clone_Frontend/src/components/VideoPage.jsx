import React from 'react'
import Youtube from 'react-youtube'
import { useParams, useLocation } from 'react-router-dom'
import { useFetch } from '../../utils/Fetch';

function VideoPage() {
    let params = useParams();
    let location = useLocation();
    let item = location.state?.item
    let videoID = item.id;
    let {data,error,loading} = useFetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoID}&key=AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY`);
    console.log(params.id);
    console.log(videoID,data);
  return (<div className="w-[80vw] relative left-[18vw] h-screen">
        <div>
        <Youtube videoId={params.id} opts={{playerVars: {autoplay: 0,modestbranding: 1,rel: 0,},}} />
        <div>
            <section>
                <h1>{item.snippet.title}</h1>
                <h1>{item.snippet.channelTitle}</h1>
            </section>

            <button className='bg-neutral-300 p-3 m-2 rounded-2xl'> <i class="fa-solid fa-handshake"></i> JOIN</button>
            <button className='bg-neutral-300 p-3 m-2 rounded-2xl'><i class="fa-solid fa-bell"></i> Subscribe</button>
            <button className='bg-neutral-300 p-3 m-2 rounded-2xl'><i class="fa-solid fa-thumbs-up"></i> Likes</button>
            <button className='bg-neutral-300 p-3 m-2 rounded-2xl'><i class="fa-solid fa-thumbs-down"></i> Dislikes</button>
            <button className='bg-neutral-300 p-3 m-2 rounded-2xl'> <i class="fa-solid fa-share-nodes"></i> Share</button>
            <button className='bg-neutral-300 p-3 m-2 rounded-2xl'><i class="fa-solid fa-download"></i> Download</button>
            
        </div>
        


        </div>
      
    </div>)
}

export default VideoPage

