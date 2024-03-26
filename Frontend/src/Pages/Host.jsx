import axios from "axios";
import { useState } from "react";
import { useContext } from "react"
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext"
import Login from "./Login"
import Select from 'react-select';
import { useEffect } from "react";

function Host () {
    let {subhostpage} = useParams();
    const {user,isHost} = useContext(UserContext);
    const [redirect,setRedirect] = useState(false);
    const [addpage,setAddpage] = useState(false);
    const [places,setPlaces] = useState([])
  
    useEffect(()=>{
    axios.get('http://localhost:3001/myPlaces').then(({data})=>{
        setPlaces(data);
    })

    },[])
     
    
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [photos,setPhotos] = useState([]);
    const [maxguests,setMaxguests] = useState('');
    const [description,setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [placeId,setPlaceid] = useState('');
    

    const options = [
        {value:'tv',label:"TV" },
        {value:'pool',label:'pool'},
        {value:'ac',label:'AC'}
    ]

    const handleChange = (perks) => {
        setPerks(perks);
    }

    if (subhostpage===undefined){
        subhostpage="my-places"
    }
    
    const handelaccept = ()=>{
        axios.post('http://localhost:3001/signupashost',{id:user._id})
    }
    const handeldecline = (e)=>{
        e.preventDefault();
        setRedirect(true);
    }

    if(redirect){
        return (
             <Navigate to={'/'}/>
        )
    }


    function setStyle(type = null) {
        const style = {};
        if (subhostpage === type ) {
          style.backgroundColor = 'blue';
          style.color = 'white';
          style.border = '1px solid blue';
          style.borderRadius = '20px';
        }
        return style;
    }

    const uploadPhotos = (e)=>{
        const files = e.target.files
        const data = new FormData()
        for (let i=0;i<files.length;i++){
            data.append("photos",files[i])
        }
        axios.post('http://localhost:3001/uploadPics',data,{
            headers : {'Content-Type':'multipart/form-data'}
            }).then(response=>{
                const {data:filenames} = response;
                setPhotos(prev=>{
                    return [...prev,...filenames]
                })

            })
  
    }



    const handelSubmit = (e)=>{
        e.preventDefault;
        const owner = user._id 
        axios.post("http://localhost:3001/postad",{owner,title,address,photos,maxguests,description,perks})
    }

    if (addpage){
        return (
            <form onSubmit={handelSubmit} >
                <h3>Title</h3><input type="text" placeholder="title" onChange={(e)=> setTitle(e.target.value)} required />
                <h3>Address</h3><input type="text" placeholder="address" onChange={(e)=>setAddress(e.target.value)} required />
                <h3>Photos</h3>
                {photos.length>0 && photos.map(name=>(
                    <>
                    <img src={"http://localhost:3001/"+name} alt="Photo" />
                    </>
                    
                ))}
                <input type="file" onChange={uploadPhotos} required multiple />
                <h3>max guests</h3><input type="number" onChange={(e)=>setMaxguests(e.target.value)} required />
                <h3>description</h3><textarea onChange={(e)=>setDescription(e.target.value)} required />
                <h3>preks</h3> <Select value={perks}
        onChange={handleChange}
        options={options}
        isSearchable
        placeholder="select perks"
        isMulti 
        required
        />
            <input type="submit" value="post" />
            </form>
        )
    }
    
    if(placeId!==""){
        return <Navigate to={'/place/'+placeId} />
    }

    return(
    <>

        <div className="content">
            {subhostpage==="my-places" && (
                <>
                <button className="addplace" onClick={setAddpage}>add a place</button>
                {places.length===0 && (
                    <p>You dont have any places</p>
                )}
                {places.length>0 && places.map(place=>(
                    <>
                    <div className="place" onClick={()=>setPlaceid(place._id)}>
                    <h3 className="title">{place.title}  </h3>
                    <img src={"http://localhost:3001/"+place.photos[0]} alt="pics" />
                </div>
                    </>    
                ))}
           
                </>
            )}
            {subhostpage==="reservation" && (
                <>
                    <p>My reservations are here</p>
                </>
            )}
            {subhostpage==="help-center" && (
                <>
                    <p>The help center is here</p>
                </>
            )}
        </div>

        {!isHost && user &&(
            <form>
    
                <h3>I have readed the terms and condition</h3>
                <input type="checkbox" required/>
                <button onClick={handelaccept}>I accept</button>
                <button onClick={handeldecline}>I decline</button>
            </form>
        )}

        {isHost && user &&(
            <>
            <div className="navBar">
            <nav>
                <ul className="list">
                    <li><Link style={setStyle("my-places")} to='/host-page/'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        My Places</Link>
                    </li>
                    <li><Link style={setStyle("reservation")} to='/host-page/reservation' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        reservation</Link>
                    </li>   
                    <li><Link style={setStyle("help-center")} to='/host-page/help-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        help center</Link>
                    </li>
                </ul>
            </nav>
        </div>
        
        
        </>
        )}
        
        {!user &&(
            <>
            <h3>Please Login to continue</h3>
            <Login/>
            </>
        )}

        
    </>    
    )
}

export default Host 