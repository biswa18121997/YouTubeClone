import React from 'react'

function Profile() {
  return (
    <div>
        <div>
            <img className="w-[20vw] h-[25vh] rounded-full" src="data:image/jpeg;base64,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" alt="" />
            <div className="flex flex-col p-2 m-4">
                <h1>Name of User</h1>
                <h2>Email of the user: </h2>
                <div>
                    <button className="p-2 m-1 border rounded-2xl">Customize Channel</button>
                    <button className="p-2 m-1 border rounded-2xl"> Manage Videos </button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Profile
