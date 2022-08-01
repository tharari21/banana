import {useState, useEffect} from 'react'

const ProductCard = ({product}) => {
    const [images, setImages] = useState([])
    console.log('product id',product.id)
    useEffect(() => {
        const getImages = async () => {
            console.log('product id',product.id);
            const req = await fetch(`http://localhost:5000/products/${product.id}/images`);
            const res = await req.json();
            console.log(res)
            setImages(res)
        }
        getImages()
    }, [])
    console.log('images', images)
  return (
    <div style={{ margin: '0 2em'}}>
        <h1>{product.name}</h1>
        <img style={{width: '200px'}} src={images[0]?.url} alt={`image of ${product.name}`}/>
    </div>
  )
}

export default ProductCard;