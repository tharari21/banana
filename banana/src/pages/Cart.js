import {useEffect, useState, useContext} from 'react'
import CartProductCard from "../components/CartProductCard"
import {UserContext} from '../pages/App'


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
    return (
        <div style={{marginLeft: '20%'}}>
             <div style={{color: 'black', marginTop:'20%'}}>
                <h1>1 item in your cart</h1>
               <div style={{display: 'flex', justifyContent: 'center', gap: '10%'}}>
                <div>   

                
                {cart && cart.map(cartItem=><CartProductCard product={cartItem}/>)}
                </div>
                        <div style={{boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.1)', height: '300px', width: '300px', display: 'flex', justifyContent: 'center', borderRadius: '5px', flexDirection:'column', padding: '30px'}}>
                            <p style={{fontSize: '1.4rem'}}>How you'll pay</p>
                            <div>
                                <img style={{width: '50px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="" />
                                <img style={{width: '50px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhuXhrwoq-zXI7bAkt1NQ9-4YVcCKkPawp2e2FMTERPya8fWkoOk--Ezum3TeX07_rr4&usqp=CAU" alt="" />
                                <img style={{width: '50px'}} src="https://yt3.ggpht.com/ytc/AMLnZu9ePRJLEuHmEfAmCU3_biGuALlS-9gA9dpJsh2izg=s900-c-k-c0x00ffffff-no-rj" alt="" />
                                <img style={{width: '50px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="" />
                            </div>
                            <span style={{display: 'flex', alignItems: 'center'}}><p style={{fontSize: '1.4rem', marginRight:'auto'}}>Item(s) Total:</p><p style={{fontSize: '1.4rem'}}>{'total'}</p></span>
                            <button style={{height: '35px', borderRadius: '5px', border: 'none', backgroundColor:'#00a8ff', color: 'white', fontWeight: 'bold'}}>Proceed to checkout</button>
                        </div>
               </div>
            </div>              
        </div>
    )
}

export default Cart