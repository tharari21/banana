import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../pages/App'
const CartCard = ({cartItem, removeItemFromCart}) => {
    const {user} = useContext(UserContext)
    const [images, setImages] = useState(null)
    const [quantity, setQuantity] = useState(cartItem.quantity)
    useEffect(() => {
        const getImages = async () => {
            const req = await fetch(`http://10.129.2.168:5000/products/${cartItem.product.id}/images`)
            const res = await req.json();
            setImages(res)
        }
        getImages();
    }, [])

    

    const onQuantityChange = async (e) => {
        // Check if input is a number
        const newQuantity = e.target.value.replace(/\D/g, '');
        console.log(newQuantity)
        setQuantity(e.target.value)
        if (newQuantity) {

            try {
                const req = await fetch(`http://10.129.2.168:5000/cart/${cartItem.id}?userId=${user.user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({quantity: newQuantity})
                })
                const res = await req.json()
                console.log(res)
                setQuantity(newQuantity)
            } catch (err) {
                console.log(err)
            }

        }

    }
    const cartItemStyle = {position: 'relative',width: '80%', boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.21)",height: '300px', padding: '1em 3em', margin: '2em 0', borderRadius: '16px'}
    const cartItemImageContainerStyle = {float: 'left'}
    const cartItemContentContainerStyle = {}
    const priceStyle = {position: 'absolute', bottom: '-1em', right: '1em',fontSize: '3em'}
return (
     <div style={cartItemStyle}>
        <span onClick={() => {removeItemFromCart(cartItem.id)}} style={{position: 'absolute', top: '1em', right:'1em', fontSize: '1.4em', cursor: 'pointer'}}>&#10005;</span>
        <div style={cartItemImageContainerStyle}>
            <img  src={images && images[0]?.url} alt="" style={{width: '200px', marginRight: '2em'}} />
        </div>
        <div style={cartItemContentContainerStyle}>
            <h1 style={{padding: '0 2em'}}>{cartItem.product.name}</h1>
            <h3>{cartItem.product.description}</h3>
            <label style={{ position: 'absolute', bottom: '15%', right: '15%' }}>
                <span style={{fontSize: '1.5em'}}>Quantity</span>
                <input name="quantity" type="number" value={quantity} onChange={onQuantityChange} style={{  marginLeft: '1em', width: '25px', height: '20px', padding: '.3em 1em', fontSize: '.9em'}}/>

            </label>
            <span style={priceStyle}>
                <h1>$ {cartItem.product.price}</h1>
            </span>
        </div>

    </div>
)
}

export default CartCard