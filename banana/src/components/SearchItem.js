import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, NavLink, Switch, Link, useHistory } from "react-router-dom";
const SearchItem = ({product, setSelectedProduct}) => {
    const [images,setImages]= useState([])
     useEffect(() => {
      const getImages = async () => {
          const req = await fetch(`http://10.129.2.168:5000/products/${product.id}/images`);
          const res = await req.json();
          setImages(res)
      }
      getImages()
  }, [])

   let history = useHistory();
  const  handleClick = ()=>  {
    history.push(`/products:id=${product.id}`);
    setSelectedProduct(product)
  }
    return (
        <div onClick={handleClick} style={{color: 'black', border: '1px solid rgba(0,0,0,0.1)',borderRadius:'5px', display: 'flex', width: '70%', height: '200px'}}>
            <img style={{width: '250px'}} src={images[0]?.url || "https://media.istockphoto.com/photos/chimpanzee-picture-id170615395?k=20&m=170615395&s=612x612&w=0&h=CswkxjdPpmDOF7FLJ64nuaYrQzsreIS2Ph9KV4ln15g="} alt="" />
            <div style={{marginLeft: '20px'}}>
                <h3 style={{fontSize: '2rem'}}>{product.name}</h3>
                <p style={{margin: '0'}}>{product.rating}</p>
                <span style={{display: 'flex', alignItems: 'center', margin: '0'}}>
                <p>$</p>
                <p style={{fontSize: '2rem'}}>{product.price}</p>
                </span>
            </div>
        </div>
    )
}
export default SearchItem