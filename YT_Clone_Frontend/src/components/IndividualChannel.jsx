import React from 'react'
import { UserContext } from '../utils/Context'
import { useContext } from 'react'


function IndividualChannel({data}) {
  let {user,token,profile} = useContext(UserContext);




  return (
    <div>
    <img src={data.channelBanner} alt="" />
    <div>
        <div>
            <h1>{data.channelName} </h1> 
            <p>{data.channelDescription}</p>
            <p>{data.OwnerID}</p>
            <p>{data.subscribersCount}</p>
        </div>
        <div>
            <h1> Channel Video List:</h1>
        </div>
    </div>
    <button>PUBLISH A NEW VIDEO..</button>
      
    </div>
  )
}

export default IndividualChannel





