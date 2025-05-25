import React from 'react'
import { useFetch } from '../utils/Fetch';
import { Link, useLocation,useParams } from 'react-router-dom';

function VideoPageSidebarSingle({prevPageInfo}) {
  let location = useLocation();
  let params = useParams();
  let item = location.state.item;
  let dataFromLast = location.state.item;
  const API_KEY = "AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY"; 
  const MAX_RESULTS = 10;
  const query = dataFromLast.snippet.tags.join().split(' ').slice(0,5).join(' ');
  console.log(dataFromLast,query,prevPageInfo,item);

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${params.id}&maxResults=${MAX_RESULTS}&key=${API_KEY}`;

  let {data,error , loading} = useFetch(url);
  console.log(data);


  return (<div className='   flex flex-col  w-full m-2 overflow-y-scroll sticky top-5 h-screen '>
       {data?.items?.map((item, index) => (
        <Link to={`/video/${item?.id?.videoId}`} state={item}>
          <div key={index} className="flex justify-between items-center border p-1 h-fit  w-full">
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
