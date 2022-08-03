const CartProductCard = ({product}) => {
return (
     <div style={{maxWidth: '800px'}}>
                    <img src={product.url} alt="" style={{width: '200px'}} />
                    <p>{product.description}</p>
                    <h3>{product.price}</h3>
    </div>
)
}

export default CartProductCard