import React from 'react'
import { useFetch } from '../utils/Fetch';
import { Link, useLocation,useParams } from 'react-router-dom';

function VideoPageSidebarSingle({prevPageInfo}) {

  let params = useParams();
  const API_KEY = "AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY"; 
  const API_KEY_2 = 'AIzaSyANrQ1rFYCVFXKpLcuqYnQ7yLuzOcxbMy8';
  const MAX_RESULTS = 10;  
  let tags = prevPageInfo?.join(' ');
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${tags}&maxResults=${MAX_RESULTS}&key=${API_KEY_2}`;
  let {data,error , loading} = useFetch(url);


  return (<div className='w-full   flex flex-col  md:w-2/5 m-2 overflow-y-scroll sticky top-5 h-screen '>
    <h1>Videos of Similar Types: (from youtube)</h1>
       {data?.items?.map((item, index) => (
        <Link to={`/video/${item?.id?.videoId}`} >
          <div key={index} className="flex m-2 rounded-3xl justify-between items-center border  h-fit  w-fit">
              <img src={item.snippet.thumbnails.medium.url} alt='THUMBNAIL' className="w-1/2 h-full"/>
              <div className="ml-4">
                <h3 className='text-wrap'><strong> {item.snippet.title.slice(0,30)}</strong></h3>
                <h3> {item.snippet.channelTitle}</h3>
                <h3> <i class="fa-solid fa-clock"></i> :  {new Date(item.snippet.publishedAt).toLocaleString()}</h3>
              </div>
          </div>
           </Link>
      ))}
    </div>)
}

export default VideoPageSidebarSingle
