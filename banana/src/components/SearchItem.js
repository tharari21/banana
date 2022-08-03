import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, NavLink, Switch, Link } from "react-router-dom";
const SearchItem = ({product}) => {
    const [images,setImages]= useState([])
     useEffect(() => {
      const getImages = async () => {
          const req = await fetch(`http://10.129.2.168:5000/products/${product.id}/images`);
          const res = await req.json();
          setImages(res)
      }
      getImages()
  }, [])
    return (
        <NavLink to={`/products/${product.id}`} style={{color: 'black', border: '1px solid rgba(0,0,0,0.1)',borderRadius:'5px', display: 'flex', width: '70%', height: '200px'}}>
            <img style={{width: '250px'}} src={images[0]?.url} alt="" />
            <div style={{marginLeft: '20px'}}>
                <h3 style={{fontSize: '2rem'}}>{product.name}</h3>
                <p style={{margin: '0'}}>{product.rating}</p>
                <span style={{display: 'flex', alignItems: 'center', margin: '0'}}>
                <p>$</p>
                <p style={{fontSize: '2rem'}}>{product.price}</p>
                </span>
            </div>
        </NavLink>
    )
}
export default SearchItem