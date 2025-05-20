import { Link } from "react-router-dom"

export default function HomePage(){



    return(<div className="w-[79vw] relative left-[20vw] h-screen">
        <div className="flex flex-col justify-center items-center h-1/2 ">

        <div className="flex flex-col justify-center items-center border p-4 m-4">
            <h1>Please Login or / Register to view more personalied content..</h1>
            <i class="fa-solid fa-user border-2 p-2 m-2 rounded-2xl text-3xl"></i>
            <Link to={'/login'}>
                 <button className="p-2 m-2 border rounded-2xl"> Log In</button>
            </Link>
            <Link to={'/register'}>
                <button className="p-2  border rounded-2xl"> Register</button>
            </Link>
            
        </div>
        
        
        </div>
        <hr />
        <div>
            <h1 className="text-center">Videos :</h1>
        
        
        </div>
        
        </div>)
}


//yt api key=   AIzaSyCLfNg8E42zJZF5obZA-5e4AboR5YzKRFY