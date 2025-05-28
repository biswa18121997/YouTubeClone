import {useParams} from 'react-router-dom'
import { useContext,useState,useEffect } from 'react'    
import { UserContext } from '../utils/Context'
import React from 'react'
import { useFetch } from '../utils/Fetch';
import Youtube from 'react-youtube'
import VideoPageSidebarSingle from './VideoPageSidebarSingle';

function VideoPage() {
    let [sideBar,setSideBar] = useState({});
    let [comment, setComment] = useState('');
    let [commentsList,setCommentsList] = useState({});
    let params = useParams();
    let {setData, token, user, profile}  = useContext(UserContext);
    let videoID = params.id;
    const API_KEY = "AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY"; 
    let URL_PLAY =`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoID}&key=${API_KEY}`;
    let {data, error, loading} = useFetch(URL_PLAY);
    //console.log(data);
    if(error)
        console.log(error);
    // async function updateWatchList(e) {
    //     try {
    //         e.preventDefault();
    //         let vidData = {
    //             userLoginRoken : token,
    //             user,
    //             profile
    //         }
    //         console.log(vidData);
    //         let sendToServer = await fetch('http://localhost:8086/video/:id',{
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({userLoginToken:token, user, chBanner, chDescription, chTags, chName})
    //         });
    //     } catch (error) {
            
    //     }
    // }
    async function updateDownloadsList (e) {
        try {
            e.preventDefault();
            let videoData = {
                
                userLogintoken : token,
                videoID : params.id,
                user,
                videoData : data
            }
            let sendToServer = await fetch(`http://localhost:8086/video/${params.id}`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userLoginToken:token, user, videoID})
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function getVideoPageData(){
            try {
                console.log(videoID,token,user,data?.items[0]);
                let vidPageReq = {
                    videoID,token,user,videoData:data?.items[0]
                };
                let reqVideoPageData = await fetch(`http://localhost:8086/video/${params.id}`,{
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( vidPageReq )
                })
                let resVideoPage = await reqVideoPageData.json();
                setCommentsList(resVideoPage.checkIfExists);
                // console.log(comment,commentsList)
            } catch (error) {
                console.log(error)
            }  
        }
    useEffect(()=>{
        
        
        getVideoPageData();
        //need to add something so that comments are fetched and displayed 
    },[commentsList,URL_PLAY])
    async function increaseLikeCountOfUser_Video_RecentlyLiked(e){
        try {
            e.preventDefault();
            let sendToServer ={
                token, user, videoId:videoID, videoData: data.items[0] ,update : 'increament like'
            }
            console.log(videoID);
            let sendRequest = await fetch(`http://localhost:8086/video/${params.id}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendToServer)
            })
            let response = await sendRequest.json();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    async function addComment(){
        try {
            let sendToServer ={
                token, user, videoId:videoID, videoData: data.items[0] ,update : 'post comment',comment
            }
            if(!comment.trim())
                return;
            console.log(sendToServer);
            let sendRequest = await fetch(`http://localhost:8086/video/${params.id}`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( sendToServer )
            })
            setComment('');
            let response = await sendRequest.json();
            console.log(response);
            setCommentsList(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (<div className="w-[85vw] relative left-[10vw] h-full flex top-[15vh]">
        <div className='m-5 w-full h-full '>
            <Youtube videoId={params.id} opts={{ playerVars: {autoplay: 0,modestbranding: 1,rel: 0,},}} />
            <h1>{data?.items?.[0].snippet?.title}</h1>         
            <div className='flex justify-between'>               
                <section className='flex justify-center items-center'> 
                    <h1>{data?.items?.[0].snippet.channelTitle}</h1>
                    <button className='bg-neutral-300 flex justify-center items-center p-3 m-2 h-[5vh] text-sm rounded-2xl'>Subscribe <i class="fa-solid fa-bell m-1"></i> </button>
                </section>
                <section className='flex'>
                <button onClick={(e)=>increaseLikeCountOfUser_Video_RecentlyLiked(e)} className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl'><i class="fa-solid fa-thumbs-up m-1"></i>{(data?.items?.[0].statistics.likeCount/1000).toFixed(2)}k</button>
                <button className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl'><i class="fa-solid fa-thumbs-down m-1"></i></button>
                <button className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl'>  Share <i class="fa-solid fa-share-nodes m-1"></i></button>
                <button onClick={(e)=>updateDownloadsList(e)} className='h-[5vh] flex justify-center items-center bg-neutral-300 p-3 m-1 rounded-2xl'> Download <i class="fa-solid fa-download m-1"></i></button>
                </section>              
            </div>
            <hr />
            <div>
                <h1>{data?.items?.[0].snippet.description.slice(0,200)}</h1>
            </div>
            <div>
                <h1>Comments : </h1> 
                <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} name="comment" id="comment" placeholder='Add Your Comments Here..!'  className='p-2 bg-neutral-300 w-10/12 h-[15vh] rounded-2xl text-black'/>
                <button onClick={addComment} className='p-2 m-1 bg-blue-500 text-blue-50 rounded-2xl w-2/12'>Comment</button>
                <div className='w-full h-fit min-h-[100px]  m-2 rounded-2xl flex flex-col border justify-center items-center'>
                   {!commentsList && <h1>No Comments On this Video Yet..</h1>}
                    {commentsList?.checkIfExists?.map((items)=>(<div className='rounded-4xl text-white flex gap-5 flex-col border w-[80%] justify-center items-center p-4 m-4'>
                                                                    <section className='flex justify-center items-center'>
                                                                        <img className='w-[6vw] h-[8vh] rounded-full' src={`https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png`} alt="" />
                                                                        <section>
                                                                            <h1>UserID : {items.userId}</h1>
                                                                            <p className='text-sm text-neutral-500'>{items.date}</p>
                                                                        </section>
                                                                        
                                                                        
                                                                    </section>
                                                                    
                                                                    <h1 className='p-16 w-1/2 rounded-4xl bg-neutral-300 text-black border '>{items.comment}</h1>
                                                                </div>))}
                </div>       
            </div>
        </div>
        <VideoPageSidebarSingle prevPageInfo={ data?.items?.[0]?.snippet?.tags} />
    </div>)  
}
export default VideoPage
