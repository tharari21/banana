
import {useState, useEffect} from 'react';
import ProductCard from './ProductCard'
const ProductContainer = () => {
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState({})
    useEffect(() => {
        const getProducts = async () => {
            console.log('getting')
            try {
                const req = await fetch("http://localhost:5000/products");
                const res = await req.json();
                setProducts(res);

            } catch (err) {
                console.log(err)
                setErrors(err)

            }
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
        {products.length && (
            <div style={{ marginLeft: "20%", display: 'flex', flexWrap: 'wrap', gap: '2em'}}>
                {products.map((product) => <ProductCard key={product.id} product={product}/>)}
            </div>
        )}
        {errors && (
            <div style={{marginLeft: '10em'}}>
                {JSON.stringify(errors)}
            </div>
        )}
    </div>
    )
}
export default ProductContainer;
