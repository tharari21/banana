import React from 'react'

const CartPurchaseBox = () => {
  return (
    <div style={{margin: '0 0 0 12em',boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.1)', height: '300px', width: '300px', display: 'flex', justifyContent: 'center', borderRadius: '5px', flexDirection:'column', padding: '30px', position: 'fixed', right: '2em'}}>
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
  )
}

export default CartPurchaseBox