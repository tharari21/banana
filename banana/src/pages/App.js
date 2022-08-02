import { createContext, useState, useEffect } from "react";
import Sidebar from '../components/Sidebar'
import ProductContainer from '../components/ProductContainer'
import Home from '../pages/Home'

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({})
  useEffect(() => {

    const getUser = async () => {
      const req = await fetch("http://localhost:5000/auth/fetch-user", {
        method: 'POST',
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const res = await req.json()
      console.log('res', res)
      setUser(res)
    }
    getUser()
  }, [])
  return (
    <div className="App">
      <UserContext.Provider value={user} >
        <Sidebar/> 
      </UserContext.Provider>
      <Home/>
      <ProductContainer/>
    </div>
  );
  }
export default App;
