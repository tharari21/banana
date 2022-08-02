
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

    return (
        <div
    style={{
      height: "auto",
      width: "100%",
      backgroundColor: "#fed13056",
      color: "black",
      padding: '1em'
    }}
  >
            <div style={{ marginLeft: "20%", display: 'flex', flexWrap: 'wrap', gap: '2em'}}>

                    {products.map((product) => <ProductCard key={product.id} product={product}/>)}
            </div>
    </div>
    )
}
export default ProductContainer;
