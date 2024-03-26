import {useState} from "react";
import axios from "axios";
import { Link, Navigate,useNavigate } from "react-router-dom";
import "./SignUp.css"
import { useContext } from "react";
import { UserContext } from "../UserContext";


function Login(){

    
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [login,setLogin] = useState(false);

    const navigate = useNavigate();

    const {user,setUser} = useContext(UserContext);

    const handelSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/login",{email,password})
        .then(result=>{
            if(result.data.state==="You are logged in"){
                alert("You are logged in")
                setUser(result.data.userDoc)
                setLogin(true)
            }
            if (result.data==="Password incorrect")
            alert("Password incorrect")
            if (result.data==="User not found")
            alert("User not found")
        })
        .catch(err=>console.log(err))
    }
    
    if (login){
        window.location.reload()
       return (<Navigate to={'/'} />)
    }

    if (user){
        return <Navigate to='/'/>
    }
    
    return(
        <>
            <form className="form" onSubmit={handelSubmit}>
                <input type="email"  placeholder="e-mail" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                <input type="submit" value="Login" />
                <p>You don't have an account . <Link to="/signup"> Sign-up</Link></p>
            </form>
        </>
    )
}

export default Login