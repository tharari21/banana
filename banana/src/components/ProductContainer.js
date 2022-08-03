
import {useState, useEffect} from 'react';
import ProductCard from './ProductCard'

const ProductContainer = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
       try {
            const req = await fetch("https://localhost:5000/products");
            const res = await req.json();
            setProducts(res);
        } catch (err) {
          console.log('error',err)
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
        {products && (
            <div style={{ marginLeft: "20%", display: 'flex', flexWrap: 'wrap', gap: '2em'}}>
                {products.map((product) => <ProductCard 
                    key={product.id} 
                    product={product} 
                    setSelectedProduct={setSelectedProduct}
                />)}
            </div>
        )}
      </div>
    </div>
  );
};
export default ProductContainer;
