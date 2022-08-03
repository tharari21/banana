
import { createContext, useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, NavLink, Switch, Link } from "react-router-dom";
import LogInForm from '../components/LogInForm'
import SignUpForm from '../components/SignUpForm'
import Home from '../pages/Home'
import Sidebar from '../components/Sidebar'
import ProductContainer from '../components/ProductContainer'
import Cart from "./Cart";
import SelectedProductPage from "../components/SelectedProductPage";
import SearchPage from "./SearchPage";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({})
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [selectedProduct, setSelectedProduct]= useState({})
  // useEffect(() => {

  //   const getUser = async () => {
  //     const req = await fetch("http://10.129.2.168:5000/auth/fetch-user", {
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
          <Route exact key={2} path='/login'>
             <UserContext.Provider value={value}>
            <LogInForm />
        </UserContext.Provider>
          </Route>
          <Route exact key={3} path='/signup'>
            <UserContext.Provider value={value}>
            <SignUpForm />
            </UserContext.Provider>
          </Route>
           <Route key={4} exact path='/cart'>
            <Cart/>
          </Route>
          <Route key={5} exact path='/search'>
            <SearchPage/>
          </Route>
          <Route path="/">
            <Home />
            <ProductContainer setSelectedProduct={setSelectedProduct} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
export default App;
