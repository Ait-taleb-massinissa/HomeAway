import axios from "axios";
import { useParams } from "react-router-dom";
import {useState , useEffect} from "react";

function Places () {

    const {id} = useParams();
    const [place,setPlace] = useState('');
    const [owner,setOwner] = useState('');
    const [isready,setIsready] = useState('');

    
    useEffect(()=>{
        axios.post('http://localhost:3001/placeInfo',{id})
        .then((result)=>{
            setPlace(result.data)
            setIsready(true)
        })
        const ownerID = place.owner
        axios.post('http://localhost:3001/getOwnerInfo', {ownerID})
        .then((infos)=>{
           setOwner(infos)
        })
        
    },[])
    

    return(
        <>
        <h3 className="title">{place.title}</h3>
        <div className="photos">
            {isready && place.photos.map(pic=>(
                <img src={"http://localhost:3001/"+pic} alt="Place pic" />
            ))}
        </div>
        <h3>Address</h3>
        <p className="address"> {place.address} </p>
        <h3>Description</h3>
        <p className="description" > {place.description} </p>
        <h3>Perks</h3>
        {isready && place.perks.map(perk=>(
            <p className="perks" > {perk.label} </p>)
        )}
        <div className="owner">
            <p className="ownerName" > {owner.firstName} </p>
        </div>

        </>
    )
   
}

export default Places;