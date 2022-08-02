
import {useState, useEffect} from 'react';
import ProductCard from './ProductCard'
const ProductContainer = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            const req = await fetch('http://localhost:5000/products');
            const res = await req.json();
            console.log('products', res)
            setProducts(res);
        }
        getProducts();
    }, [])

    const productContainer = {display: 'flex', justifyContent: 'center'}
    return (
        <div
    style={{
      height: "100vh",
      width: "100%",
      backgroundColor: "#fed13056",
      color: "black",
    }}
  >
    <div style={{ marginLeft: "20%" }}>

            {products.map((product) => <ProductCard key={product.id} product={product}/>)}
    </div>
        </div>
    )
}
export default ProductContainer;
