import { useState } from "react";


export default function Register(){

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [mail,setMail] = useState('');
    const [password, setPassword] = useState('');

    return(<div className="w-[80vw] relative left-[20vw] h-screen">

        <div className="flex flex-col justify-center items-center h-4/5 w-3/4 ">
            <h1 className="text-3xl font-serif underline underline-offset-8">Register as a new User :</h1><br /><br />
            <hr />


            <form action="/login" className="flex flex-col justify-center items-center border p-4 rounded-2xl w-2/3">
                <i className="fa-solid fa-user  p-2 m-2 rounded-2xl text-8xl border-2 text-center"></i>
                <label htmlFor="registername" onChange={(e)=>setName(e.target.value)} className="text-start">Enter Full Name :</label>
                <input type='text'  name="name" id="registername" placeholder="Enter Your Full Name." className="p-2 bg-neutral-400 w-full rounded-3xl m-2" />
                <label htmlFor="loginmail" onChange={(e)=>setMail(e.target.value)} className="">Registered  Email :</label>
                <input type='email'  name="email" id="loginmail" placeholder="Enter Your Registered E-mail.." className="p-2 bg-neutral-400 w-full rounded-3xl m-2" />
                <label htmlFor="loginpassword">Password :</label>
                <section className="w-full flex justify-center items-center">
                    <input type={show?'text':'password'} name="password" id="loginpassword" placeholder="Enter your password " className="p-2 bg-neutral-400 w-full rounded-3xl m-2"/>
                    <i onClick={()=>setShow(!show)} class={show?'fa-solid fa-eye':'fa-solid fa-eye-low-vision' }></i>
                </section>
                <p className="text-blue-700 underline underline-offset-8 m-1">Forgot your Password .? </p>         
                    <button className="p-2 m-2 rounded-2xl border w-full">Login</button> 
                    <button className="p-2 m-2 rounded-2xl border w-full bg-green-400">Register</button> 
            </form>
        </div>
    </div>)
}