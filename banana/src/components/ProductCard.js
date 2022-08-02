import {useState, useEffect} from 'react'

const ProductCard = ({product}) => {
    const [images, setImages] = useState([])
    console.log('product id',product.id)
    useEffect(() => {
        const getImages = async () => {
            console.log('product id',product.id);
            const req = await fetch(`http://localhost:5000/products/${product.id}/images`);
            const res = await req.json();
            console.log(res)
            setImages(res)
        }
        getImages()
    }, [])
    console.log('images', images)
  // return (
  //   <div style={{ margin: '0 2em'}}>
  //       <h1>{product.name}</h1>
  //       <img style={{width: '200px'}} src={images[0]?.url} alt={`image of ${product.name}`}/>
  //   </div>
  // )
  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        padding: "1em",
        borderRadius: "10px",
        boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.21)",
      }}
    >
      <img
        style={{ maxWidth: "22em" }}
        src="https://m.media-amazon.com/images/I/A14F1QVaPNL._AC_UL320_.jpg"
        alt=""
      />
      <div style={{ padding: "1em 0em 0.5em 0.5em" }}>
        {" "}
        <span style={{ display: "flex", gap: "3em" }}>
          <p>{"name of product"}</p>
          <div style={{ display: "flex", flexDirection: 'colomn', alignItems: 'center', gap:'5px'}}>
            <ion-icon name="star"></ion-icon>
            <p>{"product rating"}</p>
          </div>
        </span>
        <h3>{"product Price"}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
