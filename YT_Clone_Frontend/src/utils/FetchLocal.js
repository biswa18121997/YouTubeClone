// import { useNavigate } from "react-router-dom";

export default function FetchLocal(){
    // let navigate = useNavigate();
    let loggedIn = null;
    let localStorageCheck = localStorage.getItem('userAuth');
    if(!localStorageCheck){
        loggedIn = false;
        // navigate('/login');
        return loggedIn;
    }
    else{
        return localStorageCheck.userAuth;
    }
}