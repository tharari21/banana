
import { createContext, useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, NavLink, Switch, Link } from "react-router-dom";
import LogInForm from '../components/LogInForm'
import SignUpForm from '../components/SignUpForm'
import Home from '../pages/Home'
import Sidebar from '../components/Sidebar'
import ProductContainer from '../components/ProductContainer'
import Cart from "./Cart";
import SelectedProductPage from "../components/SelectedProductPage";

export const UserContext = createContext();

function App() {
  console.log('access token',localStorage.getItem('access_token'))
  const [user, setUser] = useState({})
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [selectedProduct, setSelectedProduct]= useState({})
  return (
    <Router>
        <UserContext.Provider value={value}>
      <div className="App">
          <Sidebar />
        
        <Switch>
         
          <Route exact key={1} path={`/products/1`}>
            <SelectedProductPage />
          </Route>
          <Route exact path='/login'>
            <Sidebar />
            <LogInForm />
          </Route>
          <Route exact path='/signup'>
          <Sidebar />
            <SignUpForm />
          </Route>
          <Route path="/">
            <Home />
            <ProductContainer setSelectedProduct={setSelectedProduct} />
          </Route>
           <Route key={3} exact path='/cart'>
            <Cart/>
          </Route>
          
        </Switch>
      </div>
      </UserContext.Provider>
    </Router>
  );
  }
export default App;
