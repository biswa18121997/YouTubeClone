import React from 'react'
import Youtube from 'react-youtube'
import { useParams, useLocation } from 'react-router-dom'
import { useFetch } from '../utils/Fetch.js';
import { UserContext } from '../utils/Context.jsx';
import {useContext} from 'react'
import VideoPageSidebarSingle from './VideoPageSidebarSingle.jsx';

function VideoPage() {
    //let params = useParams();

    let location = useLocation();
    let {user,profile,token} = useContext(UserContext);
    let item = location?.state?.item;
    let toServer = {
        token, user
    }
    async function updateVideoHistory( ){
        let sendVidData = await fetch('/video/:id',{
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(toServer)
                        });
            let data = await res.json();
        }
    }
   // console.log(item)
   
    let loginToken = localStorage.getItem('userAuth') || '';
 //   let {data,error,loading} = useFetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${params.id}&key=AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY`);
    async function increaseLikeCountOfUser_Video_RecentlyLiked(e){
            let params = useParams();

        e.preventDefault();
        try {
            let LikesCountUpdate = {
                update : 'like',
                userLoginToken : token,
                videoId : params.id ,
                tags : item?.snippet?.tags?.slice(0,5),
                interests : item?.snippet?.tags?.slice(0,2),
                name : user.name,
                userID : user.email,
                likes : item?.statistics?.likeCount,
                videoThumbnail : item?.snippet?.thumbnails?.medium?.url,
                videoTitle : item?.snippet?.title,
                videoDescription : item?.snippet?.description,
                channelId : item?.snippet?.channelId,
                channelName : item?.snippet?.channelTitle,
            }
            console.log(LikesCountUpdate)
            const res = await fetch(`http://localhost:8086/video/${params.id}`, { // Change URL if needed
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(LikesCountUpdate),
            });
            let data;
            if(res.ok){
                data = await res.json();
                console.log(data)
            }
            } catch (error) {
                console.log(error);
            }  
    
  return (<div className="w-[85vw] relative left-[14vw] h-full flex">
        <div className='m-5 w-full h-full'>
            <Youtube videoId={params.id} opts={{ playerVars: {autoplay: 0,modestbranding: 1,rel: 0,},}} />
            <h1>{item?.snippet?.title}</h1>
            
            <div className='flex justify-between'>
                
                <section className='flex justify-center items-center'>
                    
                    <h1>{item.snippet.channelTitle}</h1>
                    <button className='bg-neutral-300 flex justify-center items-center p-3 m-2 h-[5vh] text-sm rounded-2xl'>Subscribe <i class="fa-solid fa-bell m-1"></i> </button>

                </section>
                <section className='flex'>
                <button onClick={(e)=>increaseLikeCountOfUser_Video_RecentlyLiked(e)} className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl'><i class="fa-solid fa-thumbs-up m-1"></i>{(item.statistics.likeCount/1000).toFixed(2)}k</button>
                <button className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl'><i class="fa-solid fa-thumbs-down m-1"></i></button>
                <button className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl'>  Share <i class="fa-solid fa-share-nodes m-1"></i></button>
                <button className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl'> Download <i class="fa-solid fa-download m-1"></i></button>
                </section>
                
            </div>
            <hr />
            <div>
                <h1>{item.snippet.description.slice(0,200)}</h1>
            </div>
            <div>
                <h1>Comments : </h1> 
                <input type="text" name="" id="" placeholder='Add Your Comments Here..!'  className='p-2 bg-neutral-300 w-10/12 h-[15vh] rounded-2xl'/>
                <button className='p-2 m-1 bg-blue-500 text-blue-50 rounded-2xl w-2/12'>Comment</button>
                <div className='w-full h-fit min-h-[100px] bg-neutral-300 m-2 rounded-2xl flex justify-center items-center'>
                    <h1>No Comments On this Video Yet..</h1>

                </div>
               
            </div>
        </div>
        {/* <div className='w-full'> */}
        <VideoPageSidebarSingle prevPageInfo={ item} />

        {/* </div> */}
    </div>)
}

export default VideoPage

