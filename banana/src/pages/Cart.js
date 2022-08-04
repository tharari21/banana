import { useState, useContext, useEffect} from "react"
import CartContainer from "../components/CartContainer"
import CartPurchaseBox from "../components/CartPurchaseBox"
import {Redirect} from 'react-router-dom';
import { UserContext } from "./App"

const Cart = () => {
    const {user, setUser} = useContext(UserContext)
    const [numItemsInCart, setNumItemsInCart] = useState(0)
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        console.log(query.get('success'))
        if (query.get("success")) {
            alert("Order placed! You will receive an email confirmation.")
        setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            alert( "Order canceled -- continue to shop around and checkout when you're ready.")
        setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
        );
        }
    }, []);

    return (
        <div style={{marginLeft: '20%', width: '60%', color: 'black'}}>
            {!user?.user && <Redirect to="/login"/>}
             <div style={{color: 'black', marginTop:'20%'}}>
             <h1>{numItemsInCart} item in your cart</h1>
            </div>             
            <CartContainer setNumItemsInCart={setNumItemsInCart} />
            <CartPurchaseBox />
            {message && <p>{message}</p>}
        </div>
    )
}
export default Cart;


// import React, { useState, useEffect } from "react";
// import "./App.css";

// const ProductDisplay = () => (
//   <section>
//     <div className="product">
//       <img
//         src="https://i.imgur.com/EHyR2nP.png"
//         alt="The cover of Stubborn Attachments"
//       />
//       <div className="description">
//       <h3>Stubborn Attachments</h3>
//       <h5>$20.00</h5>
//       </div>
//     </div>
//     <form action="/create-checkout-session" method="POST">
//       <button type="submit">
//         Checkout
//       </button>
//     </form>
//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );


//   return message ? (
//     <Message message={message} />
//   ) : (
//     <ProductDisplay />
//   );
