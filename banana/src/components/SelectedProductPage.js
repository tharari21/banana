import { useEffect, useState, useContext } from "react";
import { UserContext } from "../pages/App";
import {useParams} from 'react-router-dom'
const SelectedProductPage = () => {
  const params = useParams();

  const {user} = useContext(UserContext)

const [product, setProduct]= useState({})
const [images, setImages]= useState([])
const [addedToCartMessage, setAddedToCartMessage] = useState('') 

addedToCartMessage && setTimeout(() => {
  setAddedToCartMessage('')
}, 3000)

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
  let req = await fetch(`http://10.129.2.168:5000/cart?userId=${user.user.id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({productId: product.id})
  })
  let res = await req.json()
  setAddedToCartMessage(`${product.name} ADDED TO CART`);
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
    {addedToCartMessage && <div style={{backgroundColor: 'rgb(252, 225, 128)', marginTop: '2em', padding: '1em 2em', borderRadius: '10px'}}><h2>{addedToCartMessage}</h2></div>}

     <h2 style={{ fontSize: "3rem" }}>{product.name}</h2>
     <span>{'★'.repeat(product.rating)}</span>
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
           margin: "0",
           gap: "0",
           padding: "0",
           display: 'flex',
           flexWrap: 'wrap'
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
           style={{ width: "250px", height: "250px", margin: '0'}}
           src={images[2]?.url}
           alt=""
         />
         <img
           style={{ width: "250px", height: "250px" ,margin: '0'}}
           src={images[3]?.url}
           alt=""
         />
         <img
           style={{ width: "250px", height: "250px", marginTop: '0' }}
           src={images[4]?.url}
           alt=""
         />
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
           height: "250px",
           width: "250px",
           display: 'flex',
           borderRadius: '5px',
           flexDirection: 'column',
           alignItems: 'center',
          justifyContent: 'center'
          
         }}
       >
           <h2 style={{ fontSize: '3rem'}}>${product.price}</h2>
           <button onClick={handleAddToCart} style={{height: '30px', width: '150px', backgroundColor: 'rgb(252, 225, 128)', borderRadius: '5px', border: 'none', cursor: 'pointer'}}>Add to cart</button>
       </div>
     </div>
     <hr />
     {/* <div id="related-products">Auto generated products</div> */}
   </div>
 );   
}

export default SelectedProductPage