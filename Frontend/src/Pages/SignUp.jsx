import {useState} from "react"
import PhoneInput from 'react-phone-number-input'
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SignUp.css"
import { UserContext } from "../UserContext";
import { useContext } from "react";

function SignUp(){
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [number,setNumber] = useState('');
    const [password,setPassword]= useState('');
    const [signup,setSignup] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    
    const handelSubmit = (e)=>{
        e.preventDefault()
      
        axios.post('http://localhost:3001/signup',{ firstName, lastName, email, number, password})
        .then(result=>{
            console.log(result.data)
            if(result.data==="You have created an account"){
                alert("You have created an account")
                setSignup(true)
            }
            
        }
        )
        .catch(err => console.log(err));
    }


    if(signup){
        return <Navigate to={"/login"}></Navigate>
    }

    if (user){
        return <Navigate to='/'/>
    }

    return(
        <>
        <form className="form" onSubmit={handelSubmit}>
            <input type="text" placeholder="First name"  onChange={(e)=>setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last name" onChange={(e)=>setLastName(e.target.value)}/>
            <input type="email" placeholder="e-mail" onChange={(e)=>setEmail(e.target.value)}/>
            <PhoneInput international defaultCountry="DZ" value={number} onChange={setNumber} />
            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" value="Sign-up" />
            <p className='bottomText' >You already have an account. <Link to="/login">Login</Link></p>

        </form>
        </>
    )
}

export default SignUp 