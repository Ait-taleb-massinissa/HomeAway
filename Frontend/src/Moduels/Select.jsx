import { useState } from "react";
import {Link, Navigate ,useNavigate} from "react-router-dom";

function Select () {
 
    const [toaccount,setToaccount] = useState(false);
    const [tohost,setTohost] = useState(false);    

    const navigate = useNavigate();

    if (toaccount){
        return <Navigate to={'/account'} />
    }
    

    if (tohost){
        return <Navigate to={'/host-page'}/>
    }

    return(
        <div className="selectpage">
         
            <div className="account" onClick={setToaccount}>
                <Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <h3>Account page</h3>
                </Link>
            </div>
            
            <div className="host" onClick={setTohost}>
                <Link >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <h3>Host page</h3>
                </Link>
            </div>
           
        </div>
    )
}

export default Select