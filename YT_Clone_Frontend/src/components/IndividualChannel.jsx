import React, { useState } from 'react'
import { UserContext } from '../utils/Context'
import { useContext } from 'react'



function IndividualChannel({data}) {
  let [editMode, setEditMode] = useState(false);
  let [uploadMode, setUploadMode] = useState(false);
  let [videoSectionOpem, setVideoSectionOpem] = useState(false);

  let {user,token,profile} = useContext(UserContext);




  return (
    <div className='flex flex-col w-full'>
    <img src={data.channelBanner} alt="" className='w-full h-[15vh]'/>
    <div className='flex justify-evenly items-center'>
      <div>
            <h1 className='text-4xl font-bold font-serif'>{data.channelTitle} </h1> 
            <p className='text-xl text-neutral-800'>{data.OwnerID}</p>

            <p className='text-xl'>{data.channelDescription}</p>
            <p className='text-lg'> SUBSCRIBERS : {data.subscribersCount}</p>
      </div>
      <div className='flex flex-col'>
        <button className='p-1 m-1 border rounded-2xl' onClick={()=>setEditMode(!editMode)}>EDIT CHANNEL</button>
        <button className='p-1 m-1 border rounded-2xl' onClick={()=>setUploadMode(!uploadMode)}>PUBLISH VIDEO</button>
        <button className='p-1 m-1 border rounded-2xl'>DELETE CHANNEL</button>
      </div>
      <div className='flex flex-col w-1/2'>
        {editMode &&  <input className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2"  type="text" placeholder='ENTER NEW NAME OF CHANNEL' />}
        {editMode && <input className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2"  type="text" placeholder='ENTER NEW BANNER IMAGE OF CHANNEL'/>}
        {editMode &&  <input className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2"  type="text" placeholder='ENTER NEW TAGS OF CHANNEL' />}
        {editMode &&  <input className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2"  type="text" placeholder='ENTER NEW DESCRIPTION OF CHANNEL'/>}
        {uploadMode &&  <input className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2"  type="text" placeholder='ENTER VIDEO TITLE' />}
        {uploadMode &&  <input className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2"  type="text" placeholder='ENTER DESCRIPTION FOR THE VIDEO' />}
        {uploadMode &&  <input className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2"  type="text"  placeholder='ENTER VIDEO URL'/>}
        {uploadMode &&  <input className="p-2 rounded-2xl bg-neutral-400 w-full h-1/2"  type="text" placeholder='ENTER TAGS BY WHICH PEOPLE SEACH FOR YOUR VIDEO'/>}
        {(editMode|| uploadMode) && ( <section className='flex'>
              <button>SAVE</button>
              <button>CANCEL</button>
            </section>)}
      </div>

    </div>
          <button className='p-1 m-2 border rounded-2xl w-fit'>PUBLISH A NEW VIDEO..</button>
   
    <div>

    </div>
      <hr />
    </div>
  )
}

export default IndividualChannel





