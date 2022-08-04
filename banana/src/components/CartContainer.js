import {useEffect, useState, useContext} from 'react'
import {UserContext} from '../pages/App'
import CartCard from "../components/CartCard"

const CartContainer = ({setNumItemsInCart}) => {
    const {user, setUser} = useContext(UserContext)
    const [cart, setCart] = useState(null)
    useEffect(() => {
        const getCart = async () => {
            const req = await fetch(`http://10.129.2.168:5000/cart?userId=${user.user.id}`)
            const res = await req.json();
            setCart(res)
            setNumItemsInCart(res.length)
        }
        getCart()
    }, [])
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10%'}}>
        {cart && cart.map(cartItem=><CartCard key={cartItem.id} product={cartItem.product}/>)}
    </div>
  )
}

export default CartContainer