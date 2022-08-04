import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch, Link,useHistory } from "react-router-dom";
const ProductCard = ({ product}) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
      const getImages = async () => {
          const req = await fetch(`http://10.129.2.168:5000/products/${product.id}/images`);
          const res = await req.json();
          setImages(res)
      }
      getImages()
  }, [])
  const stars = (
      <span>{'★'.repeat(product.rating)}</span>
    )


  return (
        <NavLink
        to={`/products/${product.id}`}
          style={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            padding: "1em",
            
            borderRadius: "10px",
            boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.21)",
            backgroundColor: "black",
            color: "white",
            margin: "1em 0",
          }}
        >
          <img
            style={{ maxWidth: "22em", height: '14em' }}
            src={
              images[0]?.url ||
              "https://media.istockphoto.com/photos/chimpanzee-picture-id170615395?k=20&m=170615395&s=612x612&w=0&h=CswkxjdPpmDOF7FLJ64nuaYrQzsreIS2Ph9KV4ln15g="
            }
            alt=""
          />
          <div style={{ padding: "1em 0em 0.5em 0.5em" }}>
            <span style={{ display: "flex", gap: "3em" }}>
              <p>{product.name}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "colomn",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
              
                <p>{stars}</p>
              </div>
            </span>
            <h2>$ {product.price}</h2>
          </div>
        </NavLink>
      
  );
};

export default ProductCard;
