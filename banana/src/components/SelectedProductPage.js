import { useEffect, useState } from "react";
const SelectedProductPage = ({selectedProduct}) => {
let location = window.location.pathname
// const paragraph = 'http://localhost:3000/products:id=31';
const regex = /=(.*)/g;
const found = location.match(regex);
let test = found[0].split('')
let pathId =test[1]+ test[2]
console.log(pathId)
const [product, setProduct]= useState({})
useEffect(()=> {
  const getProduct = async() => {
      let req = await fetch(`http://10.129.2.168:5000/products/${pathId}`)
      let res = await req.json()
      setProduct(res)
  }

  getProduct()
},[])

const handleAddToCart = () => {
//  fetch('http://10.129.2.168:5000/cart', {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(product)
//  }) 
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
         src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-46358245/original/e02fa4d8-2cb2-4e87-a523-091e5bd78bf6.jpeg?im_w=1200"
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
           src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-46358245/original/072dad35-7456-4bec-8e67-7f7519add770.jpeg?im_w=720"
           alt=""
         />
         <img
           style={{ width: "250px", height: "250px" }}
           src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-46358245/original/cc1d13e7-be7c-45b3-b56b-fd73cb1995a9.jpeg?im_w=720"
           alt=""
         />
         <img
           style={{ width: "250px", height: "250px" }}
           src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-46358245/original/aca78a06-b981-4c31-878b-b3b8fce73f24.jpeg?im_w=720"
           alt=""
         />
         <img
           style={{ width: "250px", height: "250px" }}
           src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-46358245/original/0fd8e4ce-f146-49ea-9cb8-c48cf3bbbdaf.jpeg?im_w=720"
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
           <button >Add to cart</button>
           <button onClick={handleAddToCart} >Buy now</button>
         </div>
       </div>
     </div>
     <hr />
     <div id="related-products">Auto generated products</div>
   </div>
 );   
}

export default SelectedProductPage