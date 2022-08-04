import { useEffect, useState, useContext } from "react";
import { UserContext } from "../pages/App";
import {useParams} from 'react-router-dom'
const SelectedProductPage = () => {
  const params = useParams();

  const {user, setUser } =useContext(UserContext)

const [product, setProduct]= useState({})
const [images, setImages]= useState([])
useEffect(()=> {
  const getProduct = async() => {
      let req = await fetch(`http://10.129.2.168:5000/products/${params.id}`)
      let res = await req.json()
      setProduct(res)
  }
  const getImages = async() => {
      let req = await fetch(`http://10.129.2.168:5000/products/${params.id}/images`)
      let res = await req.json()
      setImages(res)
  }
  

  getProduct();
  getImages();
},[])

const handleAddToCart = async() => {
console.log(user.user.id)
  let req = await fetch(`http://10.129.2.168:5000/cart?userId=${user.user.id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({productId: product.id})
  }) 
  let res = await req.json()
  console.log('add cart item response', res)
}
return (
   <div
     style={{
       marginLeft: "20%",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       color: "black",
     }}
   >
     <h2 style={{ fontSize: "3rem" }}>{product.name}</h2>
     <span>{product.rating}</span>
     <div
       id="SelectedProductImageContainer"
       style={{
         display: "flex",
         margin: "0",
         padding: "0",
         boxSizing: "border-box",
       }}
     >
       <img
         src={images[0]?.url}
         alt=""
         style={{ width: "500px", height: "500px", margin: "0" }}
       />
       <div
         id="SelectedProductImageContainerRight"
         style={{
           maxWidth: "500px",
           border: "1px solid black",
           margin: "0",
           gap: "0",
           padding: "0",
         }}
       >
         <img
           style={{
             width: "250px",
             height: "250px",
             margin: "0",
             padding: "0",
           }}
           src={images[1]?.url}
           alt=""
         />
         <img
           style={{ width: "250px", height: "250px" }}
           src={images[2]?.url}
           alt=""
         />
         <img
           style={{ width: "250px", height: "250px" }}
           src={images[3]?.url}
           alt=""
         />
         <img
           style={{ width: "250px", height: "250px" }}
           src={images[4]?.url}
           alt=""
         />
         {/* <button>Show All Photos</button> */}
       </div>
     </div>
     <div
       id="description-area"
       style={{ display: "flex", width: "1000px", marginTop: "2rem" }}
     >
       <div id="description-text-area" style={{ marginRight: "auto" }}>
         <p style={{ maxWidth: "500px" }}>
          {product.description}
         </p>
       </div>
       <div
         id="price-model"
         style={{
           marginRight: "5%",
           border: "1px solid rgba(0,0,0,0.5)",
           height: "300px",
           width: "250px",
         }}
       >
         <div style={{ display: "flex", alignItems: "center" }}>
           <h2 style={{ marginRight: "auto", marginLeft: "5%" }}>${product.price}</h2>
           <p style={{ marginRight: "5%" }}>{product.rating}</p>
         </div>
         <div style={{display:'flex', flexDirection: 'column'}}>
           <button onClick={handleAddToCart} >Add to cart</button>
           <button  >Buy now</button>
         </div>
       </div>
     </div>
     <hr />
     <div id="related-products">Auto generated products</div>
   </div>
 );   
}

export default SelectedProductPage