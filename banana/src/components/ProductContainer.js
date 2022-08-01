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
        <div style={productContainer}>
            {products.map((product) => <ProductCard key={product.id} product={product}/>)}
        </div>
    )
}
export default ProductContainer;