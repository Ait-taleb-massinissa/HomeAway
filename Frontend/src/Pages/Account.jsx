import { UserContext } from "../UserContext"
import {useContext,useState} from "react"
import {Navigate,Link, useParams} from "react-router-dom"
import axios from "axios";

function Account () {
    let {subaccountpage}=useParams();
    const {ready,user,setUser} = useContext(UserContext);
    let [redirect,setRedirect] = useState('');
    if (subaccountpage===undefined){
        subaccountpage='profile';
    }

    const logout = ()=>{
        axios.post("http://localhost:3001/logout")
        .then(()=>{
            setUser(null)
            setRedirect("/") 
        })
        .catch(err=>console.log(err))
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }


    if (!ready) return "loading..."

    if (ready && !user){
        return <Navigate to='/login'/>
    }

   
    
    function setStyle(type = null) {
        const style = {};
        if (subaccountpage === type ) {
          style.backgroundColor = 'blue';
          style.color = 'white';
          style.border = '1px solid blue';
          style.borderRadius = '20px';
        }
        return style;
    }

   
      
    
    return(
        <>
        <div className="navBar">
            <nav>
                <ul className="list">
                    <li><Link style={setStyle("profile")} to='/account/'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    account informations</Link>
                    </li>
                    <li><Link style={setStyle("reservation")} to='/account/reservation' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    my reservation</Link>
                    </li>
                    <li><Link style={setStyle("my-favorits")} to='/account/my-favorits'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    my favorits</Link>
                    </li>
                    <li><Link style={setStyle("help-center")} to='/account/help-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    help center</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="content">
            {subaccountpage==="profile" && (
                <>
                <p>Logged in as {user.firstName} </p>
                <button onClick={logout}>Logout</button>
                </>
            )}
            {subaccountpage==="reservation" && (
                <>
                    <p>My reservations are here</p>
                </>
            )}
             {subaccountpage==="my-favorits" && (
                <>
                    <p>My favorits are here</p>
                </>
            )}
            {subaccountpage==="help-center" && (
                <>
                    <p>The help center is here</p>
                </>
            )}
        </div>
        </>
    )
}

export default Account