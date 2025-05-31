import React from 'react'
import { useState,useEffect,useContext } from 'react'
import {UserContext} from '../utils/Context';


function Downloads() {
  let {downloads, setDownloads} = useState([]);
  let {profile,token, user} = useContext(UserContext);
  console.log(profile,token,user);

  useEffect(()=>{

    fetchDownloads();
  },[token,user])

  async function fetchDownloads() {
    try {
      let sendToServer = {token, user, profile}
      let reqToServer = await fetch(`http://localhost:8086/downloads`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendToServer)
            })
      console.log(sendToServer)

            let response = await reqToServer.json();
            setDownloads(response);
            console.log(response);
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div>
      
    </div>
  )
}

export default Downloads
