
import { createContext, useState, useEffect, useMemo } from "react";
import Sidebar from '../components/Sidebar'
import ProductContainer from '../components/ProductContainer'
import Home from '../pages/Home'
import { BrowserRouter as Router, Route, NavLink, Switch, Link } from "react-router-dom";
import SelectedProductPage from "../components/SelectedProductPage";
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({})
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [selectedProduct, setSelectedProduct]= useState({})
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
  console.log('selected product',selectedProduct)
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Switch>
          <Route exact path={`/products/1`}>
            <SelectedProductPage />
          </Route>
          <Route path="/">
            <UserContext.Provider value={value}></UserContext.Provider>
            <Home />
            <ProductContainer setSelectedProduct={setSelectedProduct} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
export default App;
