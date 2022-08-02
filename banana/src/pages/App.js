import { createContext, useState, useEffect, useMemo } from "react";
import Sidebar from '../components/Sidebar'
import ProductContainer from '../components/ProductContainer'
import Home from '../pages/Home'

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({})
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
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
      console.log('fetch user response', res)
      setUser(res)
    }
    getUser()
  }, [])
  console.log('user', user)
  return (
    <div className="App">
      <UserContext.Provider value={value} >
        <Sidebar/> 
      </UserContext.Provider>
      <Home/>
      <ProductContainer/>
    </div>
  );
  }
export default App;
