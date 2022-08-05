import {useEffect, useState, useContext} from 'react'
import { UserContext } from '../pages/App'

const CartPurchaseBox = () => {
  const {user} = useContext(UserContext)
  const [isWindowSmall, setIsWindowSmall] = useState(false)
  useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1530) {
          console.log('window small')
          setIsWindowSmall(true)
        } else {
          setIsWindowSmall(false);
        }
        
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    const onCheckout = async () => {
      const cartReq = await fetch(`http://10.129.2.168:5000/cart?userId=${user.user.id}`)
      const cartRes = await cartReq.json()
      console.log('cart', cartRes)
      const lineItems = cartRes.map(cartItem => {
        return {price: cartItem.product.stripe_id, quantity: cartItem.quantity}
      })

      const stripeCheckoutReq = await fetch('http://10.129.2.168:5000/checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({lineItems: lineItems})
      })
      const stripeCheckoutRes = await stripeCheckoutReq.json();
      if (stripeCheckoutRes.redirect_url) {
        window.location.href = stripeCheckoutRes.redirect_url
      }

    }

    const bigWindowPurchaseBox = {margin: '0 0 0 12em',boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.1)', height: '300px', width: '300px', display: 'flex', justifyContent: 'center', borderRadius: '5px', flexDirection:'column', padding: '30px', position: 'fixed', top: '4em', right: '2em'}
    const smallWindowPurchaseBox = {...bigWindowPurchaseBox, position: 'static', bottom: '0',left: '1%'}
  return (
    <div style={isWindowSmall ? smallWindowPurchaseBox : bigWindowPurchaseBox}>
        <p style={{fontSize: '1.4rem'}}>How you'll pay</p>
        <div>
            <img style={{width: '50px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png" alt="" />
            <img style={{width: '50px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhuXhrwoq-zXI7bAkt1NQ9-4YVcCKkPawp2e2FMTERPya8fWkoOk--Ezum3TeX07_rr4&usqp=CAU" alt="" />
            <img style={{width: '50px'}} src="https://yt3.ggpht.com/ytc/AMLnZu9ePRJLEuHmEfAmCU3_biGuALlS-9gA9dpJsh2izg=s900-c-k-c0x00ffffff-no-rj" alt="" />
            <img style={{width: '50px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="" />
        </div>
        <span style={{display: 'flex', alignItems: 'center'}}><p style={{fontSize: '1.4rem', marginRight:'auto'}}></p><p style={{fontSize: '1.4rem'}}>{}</p></span>
        <button onClick={onCheckout} style={{height: '35px', borderRadius: '5px', border: 'none', backgroundColor:'#00a8ff', color: 'white', fontWeight: 'bold'}} type="submit">
          Proceed to checkout
        </button>
    </div>
  )
}

export default CartPurchaseBox