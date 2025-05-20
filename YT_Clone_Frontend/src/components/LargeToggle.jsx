

export default function LargeToggle (){
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
        name: "Your Profile ",
        icon :`fa-solid fa-user` ,
        item :[ {
                name: "DOWNLOADS",
                icon : `fa-solid fa-download` ,
            },
            {
                name: "Your Videos",
                icon : `fa-solid fa-download` ,
            },
            {
                name: "History",
                icon : `fa-solid fa-download` ,
            },
            {
                name: "Liked Videos",
                icon : `fa-solid fa-download` ,
            },]
    },
    {
        name : "Subscribed List",
        icon : `fa-solid fa-bell`
    }]


    return(<div className="w-[15vw] flex flex-col justify-start items-center fixed  h-screen text-white bg-gray-800">

{smallToggleItems.map((items)=>
        <div className="flex justify-center items-center flex-col m-2 p-2">
           <h1><i className={`${items.icon}`}></i></h1> 
           <h1>{ items.name}</h1>
           {items.item && (
                        <ul>
                            {items.item.map((subItem, subIndex) => (
                                <li key={subIndex} className="text-center p-2 m-3 w-full">
                                    <i className={subItem.icon}></i> {subItem.name}<hr/>
                                </li>
                            ))}
                            
                        </ul>
                    )} <hr />
        </div>
    )}

    </div>)
}