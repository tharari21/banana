import { BrowserRouter as Router, Route, NavLink, Switch, Link } from "react-router-dom";
const SearchItem = () => {
    return (
        <NavLink to={`/products/`} style={{color: 'black', border: '1px solid rgba(0,0,0,0.1)',borderRadius:'5px', display: 'flex', width: '70%', height: '200px'}}>
            <img style={{width: '250px'}} src="https://m.media-amazon.com/images/I/81svbcgk6LL._AC_UY218_.jpg" alt="" />
            <div style={{marginLeft: '20px'}}>
                <h3 style={{fontSize: '2rem'}}>The best Camera on the market</h3>
                <p style={{margin: '0'}}>★★★★★</p>
                <span style={{display: 'flex', alignItems: 'center', margin: '0'}}>
                <p>$</p>
                <p style={{fontSize: '2rem'}}>1000</p>
                </span>
            </div>
        </NavLink>
    )
}
export default SearchItem