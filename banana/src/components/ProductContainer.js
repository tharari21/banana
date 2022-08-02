
import {useState, useEffect} from 'react';
import ProductCard from './ProductCard'
const ProductContainer = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const req = await fetch("http://localhost:5000/products");
      const res = await req.json();
      setProducts(res);
    };
    getProducts();
  }, []);
  const product = {
    id: 1,
    name: "thing",
    url: "thing.png",
    rating: 5,
    price:100.00
  };
  return (
    <div
      style={{
        height: "auto",
        width: "100%",
        backgroundColor: "#fed13056",
        color: "black",
        padding: "1em",
      }}
    >
      <div
        style={{
          marginLeft: "20%",
          display: "flex",
          flexWrap: "wrap",
          gap: "2em",
        }}
      >
        <ProductCard
          product={product}
          setSelectedProduct={setSelectedProduct}
        />
        {/* {products.map((product) => <ProductCard key={product.id} product={product}/>)} */}
      </div>
    </div>
  );
};
export default ProductContainer;
