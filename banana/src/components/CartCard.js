import {useState, useEffect} from 'react'
const CartCard = ({product}) => {
    const [images, setImages] = useState(null)
    useEffect(() => {
        const getImages = async () => {
            const req = await fetch(`http://10.129.2.168:5000/products/${product.id}/images`)
            const res = await req.json();
            console.log(res)
            setImages(res)
        }
        getImages();
    }, [])
    const cartItemStyle = {width: '80%', boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.21)",height: '300px', padding: '1em 3em', margin: '2em 0', borderRadius: '16px'}
    const cartItemImageContainerStyle = {float: 'left'}
    const cartItemContentContainerStyle = {}
    const priceStyle = {float: 'right',fontSize: '3em'}
return (
     <div style={cartItemStyle}>
        <div style={cartItemImageContainerStyle}>
            <img src={images && images[0]?.url} alt="" style={{width: '200px'}} />
        </div>
        <div style={cartItemContentContainerStyle}>
            <span style={priceStyle}>
                <h1>$ {product.price}</h1>
            </span>
            <p>{product.description}</p>
        </div>

    </div>
)
}

export default CartCard