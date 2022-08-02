
import {useState, useEffect} from 'react';
import ProductCard from './ProductCard'

const ProductContainer = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getProducts = async () => {
       try {
            const req = await fetch("http://localhost:5000/products");
            const res = await req.json();
            setProducts(res);
        } catch (err) {
            console.log(err)
            setErrors({errors: err})
        }
    };
    getProducts();
  }, []);
  
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
        {products.length && (
            <div style={{ marginLeft: "20%", display: 'flex', flexWrap: 'wrap', gap: '2em'}}>
                {products.map((product) => <ProductCard key={product.id} product={product} setSelectedProduct={setSelectedProduct}/>)}
            </div>
        )}
        {errors.error && (
            <div style={{marginLeft: '10em'}}>
                {JSON.stringify(errors)}
            </div>
        )}
      </div>
    </div>
  );
};
export default ProductContainer;
