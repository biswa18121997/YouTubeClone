import { Link } from "react-router-dom"

export default function SmallToggle(){
    const smallToggleItems = [{
        name: "HOME",
        icon :`fa-solid fa-house-chimney` ,
        link : '/'
    },
    // {
    //     name: "SHORTS",
    //     icon :`fa-solid fa-file-video` ,
    //     link : '/'

    // },
    {
        name: "DOWNLOADS",
        icon : `fa-solid fa-download` ,
        link : '/downloads',

    },
    {
        name: "Your Profile",
        icon :`fa-solid fa-user` ,
        link : '/profile'

    },
    {
        name : "Subscribed List",
        icon : `fa-solid fa-bell`,
        link : '/subscriberslist'

    }]


    return(<div className="invisible sm:visible  flex flex-col fixed justify-self-start items-center top-[12vh] w-[10vw] p-4 bg-gray-950 h-screen bg-gray-400">
        {smallToggleItems.map((items)=>
        <Link to={items.link}>
        <div className="flex flex-col hover:border items-center  p-2 box m-3">
           <h1><i className={`${items.icon}`}></i></h1> 
           <h1 className="text-sm">{ items.name}</h1>
        </div>
        </Link>
    )}

    </div>)

}