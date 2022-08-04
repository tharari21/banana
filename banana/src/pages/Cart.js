import { useState, useContext, useEffect} from "react"
import CartContainer from "../components/CartContainer"
import CartPurchaseBox from "../components/CartPurchaseBox"
import {Redirect} from 'react-router-dom';
import { UserContext } from "./App"

const Cart = () => {
    const {user, setUser} = useContext(UserContext)
    const [cart, setCart] = useState(null)
    useEffect(() => {
        const getCart = async () => {
            if (user.user) {
                const req = await fetch(`http://10.129.2.168:5000/cart?userId=${user.user.id}`)
                const res = await req.json();
    
                console.log(res)
                setCart(res)
            }
        }
        getCart()
    }, [])
    const [numItemsInCart, setNumItemsInCart] = useState(0)

    return (
        <div style={{marginLeft: '20%', width: '60%', color: 'black'}}>
            {!user?.user && <Redirect to="/login"/>}
             <div style={{color: 'black', marginTop:'20%'}}>
             <h1>{numItemsInCart} item in your cart</h1>
            <CartPurchaseBox />
            </div>             
            <h2>{numItemsInCart == 0? 'Please Log In to see your cart': ''}</h2> 
            <CartContainer setNumItemsInCart={setNumItemsInCart} />
        </div>
    )
}

export default Cart