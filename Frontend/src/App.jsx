import {BrowserRouter,Routes,Route} from "react-router-dom"
import axios from 'axios'
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Host from "./Pages/Host"
import Places from "./Pages/Places"


import Header from "./Moduels/Header"
import { UserContextProvider } from "./UserContext"
import Account from "./Pages/Account"

function App() {

  axios.defaults.withCredentials=true

  return (
    <UserContextProvider>
    
        <Routes>
          <Route path='/' element={ <><Header/><Home/></> } ></Route>
          <Route path='/home' element={ <><Header/><Home/></> } ></Route>
          <Route path='/signup' element={<SignUp/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/account' element={<> <Header/> <Account/> </>} />
          <Route path='/account/:subaccountpage' element={<> <Header/> <Account/> </>} />
          <Route path='/host-page' element={<> <Header/> <Host/> </>} />
          <Route path='/host-page/:subhostpage' element={ <><Header/><Host/></> } ></Route>
          <Route path='/place/:id' element={<> <Header/><Places/> </>} />
          <Route path='/place' element={<> <Header/><Places/> </>} />

        </Routes>

    </UserContextProvider>
  )
}

export default App
