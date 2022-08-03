import SearchItem from "../components/SearchItem"
import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch, Link,useHistory } from "react-router-dom";
import SelectedProductPage from "../components/SelectedProductPage";
const SearchPage = () => {

//useEffect to get products and to get catagories
//products map return SearchItem
//search item will takes props 
//catagories map return option
const [products, setProducts]=useState([])
const [categories, setcategories]=useState([])
  useEffect(() => {
    const getProducts = async () => {
       try {
            const req = await fetch("http://10.129.2.168:5000/products");
            const res = await req.json();
            setProducts(res);
        } catch (err) {
          console.log('error',err)
        }
    };
    getProducts();


    const getCategories = async()=> {
        let req= await fetch('http://10.129.2.168:5000/categories')
        let res = await req.json()
        setcategories(res.categories)
    }
    getCategories()
  }, []);
    return (
<div style={{marginLeft: '10%'}}>
    <nav style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
        <select name="catagory-filter" id="">
        {categories.map(category => {return <option name={category.name} key={category.id}>{category.name}</option>})}
        </select>
        <input type="text" style={{height: '30px', width: '600px', border:'1px solid rgba(0,0,0, 0.1)',borderRight: 'none', borderTopLeftRadius: '5px',borderBottomLeftRadius: '5px'}}/>
        <button style={{backgroundColor: 'rgb(252, 225, 128)', margin: '0', border:'1px solid rgba(0,0,0, 0.1)',borderLeft: 'none', borderTopRightRadius: '5px',borderBottomRightRadius: '5px'}}><ion-icon name="search-outline"></ion-icon></button>
    </nav>
    <Router>
        <Switch>
            <Route key={1} exact path='/products'>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2%'}}>
                        {products.map(product => {return <SearchItem product={product} key={product.id}/>})}
                </div>
            </Route>
            <Route key={2} exact path='/products/30'>
                <SelectedProductPage/>
            </Route>
            
    </Switch>
    </Router>
</div>
    )
}

export default SearchPage