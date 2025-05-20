

export default function SmallToggle(){
    const smallToggleItems = [{
        name: "HOME",
        icon :`fa-solid fa-house-chimney` ,
    },
    {
        name: "SHORTS",
        icon :`fa-solid fa-file-video` ,
    },
    {
        name: "DOWNLOADS",
        icon : `fa-solid fa-download` ,
    },
    {
        name: "Your Profile",
        icon :`fa-solid fa-user` ,
    },
    {
        name : "Subscribed List",
        icon : `fa-solid fa-bell`
    }]


    return(<div className="flex flex-col fixed justify-self-start items-center w-[10vw] h-screen bg-gray-400">
        {smallToggleItems.map((items)=>
        <div className="flex flex-col hover:border items-center  p-2 box m-3">
           <h1><i className={`${items.icon}`}></i></h1> 
           <h1>{ items.name}</h1>
        </div>
    )}

    </div>)

}