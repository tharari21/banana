
import { createContext, useState, useEffect, useMemo } from "react";
import Sidebar from '../components/Sidebar'
import ProductContainer from '../components/ProductContainer'
import Home from '../pages/Home'
import Cart from "./Cart";
import { BrowserRouter as Router, Route, NavLink, Switch, Link } from "react-router-dom";
import SelectedProductPage from "../components/SelectedProductPage";
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({})
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [selectedProduct, setSelectedProduct]= useState({})
  // useEffect(() => {

  //   const getUser = async () => {
  //     const req = await fetch("http://localhost:5000/auth/fetch-user", {
  //       method: 'POST',
  //       withCredentials: true,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //     const res = await req.json()
  //     console.log('fetch user response', res)
  //     setUser(res)
  //   }
  //   getUser()
  // }, [])
  console.log('user', user)
  console.log('selected product',selectedProduct)
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={value}>
          <Sidebar />
        </UserContext.Provider>
        <Switch>
         
          <Route exact key={1} path={`/products/1`}>
            <SelectedProductPage />
          </Route>
          <Route  key={2}exact path="/">
            <Home />
            <ProductContainer setSelectedProduct={setSelectedProduct} />
          </Route>
           <Route key={3} exact path='/cart'>
            <Cart/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
  }
export default App;
