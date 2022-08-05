import {useEffect, useState, useContext} from 'react'
import {UserContext} from '../pages/App'
import CartCard from "../components/CartCard"

const CartContainer = ({setNumItemsInCart, setCartTotal}) => {
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
    const removeItemFromCart = async (id) => {
        const req = await fetch(`http://10.129.2.168:5000/cart/${id}`, {
            method: 'DELETE'
        })
        const res = await req.json();
        if (res.deleted) {
            setCart((cart) => {
                setNumItemsInCart(cart.length-1)
                return cart.filter(cartItem => cartItem.id !== id)
            })
        }

    }
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10%'}}>
        {cart && cart.map(cartItem=><CartCard setCartTotal={setCartTotal} key={cartItem.id} cartItem={cartItem} removeItemFromCart={removeItemFromCart}/>)}
    </div>
  )
}

export default CartContainer