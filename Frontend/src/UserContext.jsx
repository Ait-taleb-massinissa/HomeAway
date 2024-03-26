import { createContext,useEffect,useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider ({children}) {

    const [user,setUser] = useState(null)
    const [ready,setReady]=useState(false)
    const [isHost,setIshost]=useState(false)

    useEffect(()=>{
        if (!user){
            axios.get("http://localhost:3001/profile")
            .then( ({data}) => {
                setUser(data)
                if(data!==null){
                    setIshost(data.isHost)
                }
                setReady(true)
            })
        }
    },[])

    return(
        <UserContext.Provider value={{user,setUser,ready,isHost}}>
            {children}
        </UserContext.Provider>
    )
}