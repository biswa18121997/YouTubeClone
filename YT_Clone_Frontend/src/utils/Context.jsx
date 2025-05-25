
import { useState } from "react";
import { createContext } from "react";



export const  UserContext = createContext();

export function UserProvider({children}){
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('userAuth');
        return stored ? JSON.parse(stored).user : {};
    });
    const [profile, setProfile] = useState(() => {
        const stored = localStorage.getItem('userAuth');
        return stored ? JSON.parse(stored).profile : {};
    });
    const [token, setToken ] = useState(()=>{
        const stored = localStorage.getItem('userAuth');
        return stored? JSON.parse(stored).token : {}
    })
    const setData = ({ user, profile, token }) => {
        setUser(user);
        setProfile(profile);
        setToken(token);
    };
    return(<UserContext.Provider value={{ user, profile, token, setData }}>
            {children}
        </UserContext.Provider>);
}





