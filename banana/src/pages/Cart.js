import { useState } from "react"
import CartContainer from "../components/CartContainer"
import CartPurchaseBox from "../components/CartPurchaseBox"

const Cart = () => {
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