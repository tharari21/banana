import { useState, useContext, useEffect} from "react"
import CartContainer from "../components/CartContainer"
import CartPurchaseBox from "../components/CartPurchaseBox"

import { UserContext } from "./App"

const Cart = () => {
    const {user, setUser} = useContext(UserContext)
    console.log(user)
    const [cart, setCart] = useState(null)
    useEffect(() => {
        const getCart = async () => {
            const req = await fetch(`http://10.129.2.168:5000/cart?userId=${user.user.id}`)
            const res = await req.json();

            console.log(res)
            setCart(res)
        }
        getCart()
    }, [])
    console.log(cart)
    const [numItemsInCart, setNumItemsInCart] = useState(0)

    return (
        <div style={{marginLeft: '20%', width: '60%', color: 'black'}}>
             <div style={{color: 'black', marginTop:'20%'}}>
             <h1>{numItemsInCart} item in your cart</h1>
            <CartPurchaseBox />
            </div>              
            <CartContainer setNumItemsInCart={setNumItemsInCart} />
        </div>
    )
}

export default Cart