import { useState } from "react"


function Channels() {
    let [formVisible,setFormVisible] = useState(false);

  return (<div className="w-[80vw] relative left-[18vw] h-fit m-2 p-2 ">
    <div className="w-full relative h-[50vh] border overflow-y-scroll">
        <h1>Your Current Channel :</h1>
        <h2>No Channels You Have </h2>


    </div><br />
    <hr />
    <div className="w-full relative top-1/2">

        <h1>Create A Channel to Start Uploading Videos : </h1>
        <button onClick={()=>setFormVisible(!formVisible)} className="bg-blue-500 p-2 m-2 border rounded-2xl">{formVisible?'Cancel ' : "+ Create"} </button>
        <form className={formVisible?`visible w-full flex flex-col items-center justify-center`: `invisible`}>
            <label htmlFor="channelName">Name of Your Channel:</label>
            <input type="text" name="channelName" id="channelName" placeholder="Enter Name of Your Channel" className="p-2 rounded-2xl bg-neutral-400 w-1/2" /><br />

            <label htmlFor="channelName">Channel Tags:</label>
            <input type="text" name="channelTags" id="channelTags" placeholder="EXAMPLES : sports technology History..--use space in between" className="w-1/2 h-24 p-2 rounded-2xl bg-neutral-400 " /><br />

            <label htmlFor="channelName">Channel Description:</label>
            <input type="text" name="channelDescription" id="channelDescription" placeholder="Describe your channel in less than 20 words" className="p-2 rounded-2xl bg-neutral-400 w-1/2 h-1/2" />

             <label htmlFor="channelBanner">Channel Banner Image:</label>
            <input type="text" name="channelBanner" id="channelBanner" placeholder="provide a link for your channel banner Image" className="p-2 rounded-2xl bg-neutral-400 w-1/2 h-1/2" />

       </form>
    </div>
      
    </div>)
}

export default Channels
