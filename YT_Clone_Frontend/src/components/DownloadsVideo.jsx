import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../utils/Context';

function DownloadsVideo({data}) {
  let {user, token, profile} = useContext(UserContext);
  let [downloads, setDownloads] = useState([]);


  async function fetchDownloads() {
    let data ={
      token, user
    }
    let sendToServer = await fetch('http://localhost:8086/downloads',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({userLoginToken:token,user})
            });
    let serverResponse = await sendToServer.json();
    console.log(serverResponse);
    
  


  return (
    
      
      <div className="w-full border bg-gray-800 p-2 rounded-2xl m-2 flex flex-col justify-center h-full ">
    <Link to={`/video/${data.videoId}`} >
            <img src={item?.videoThumbnail} alt="" className="w-full rounded-2xl h-2/3"/>
            <h2 className="text-md font-semibold text-white m-1">{item.videoDescription.slice(0,60)}</h2>
            <p className="text-sm font-semibold text-neutral-400 m-1">{item.channelId}</p>
            <span className="flex gap-[10%] items-center text-neutral-500">
                <div>{item.likes}  <i className="fa-solid fa-thumbs-up"></i>Likes</div>
                <div>{item.comments.length}  <i className="fa-solid fa-eye"></i>Views</div>
                <div>{item.dislikes}  <i className="fa-solid fa-comment"></i>Comments</div>
            </span>
    </Link>
      
      </div>
    
  )
}

export default DownloadsVideo
