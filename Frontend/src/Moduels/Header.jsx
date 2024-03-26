import { useContext } from "react";
import { useState } from "react";
import { Link,Navigate,useNavigate, useLocation  } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserContext } from "../UserContext";
import "./Header.css";
import Select from "./Select";

function Header () {
    const navigate = useNavigate();
    const [tologin,setTologin] = useState(false);
    const [tosignup,setTosignup] = useState(false);
    const [touserpage,setTouserpage] = useState(false);
    const [whatpage,setWhatpage] = useState(false);

    const location = useLocation();
    const currentPage = location.pathname.split('/').pop();

    const {user,isHost} = useContext(UserContext);
    
    if(touserpage){
        return(
            <>
                <Navigate to={'/account'}/>
            </>
        )
    }

    if(tologin){
        return(
            <Navigate to={'/login'}/>
        )
    }
 
    if(tosignup){
        return(
            <Navigate to={'/signup'}/>
        )
    }

     if (whatpage){
        
        return (
            <>
                <Header/>
                <Select/>
            </>
        )
        
    }


    return(
        <header>
            <Link to="/home" >
                <img src={logo} alt="logo" className="logo" />
            </Link>
            <nav className="nav-links">
                <Link to={"/host"} className="button-secondary">Add your home</Link>
                {!user && (
                    <>
                    <button className="button-primary" onClick={setTologin} >Login</button>
                    <button className="button-primary" onClick={setTosignup}>Sign-up</button>
                    </>   
                )}
                {user && !isHost && (
                    <div className="userPlace" onClick={currentPage!=="account"?setTouserpage:undefined} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 userIcon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        {user.firstName}
                    </div>
                )}

                {user && isHost && (
                    <div className="userPlace" onClick={setWhatpage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 userIcon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        {user.firstName}
                    </div>
                )}
                
            </nav>
        </header>
    );
}

export default Header