import {useState, useEffect} from 'react'

const ProductCard = ({product}) => {
    const [images, setImages] = useState([])
    useEffect(() => {
        const getImages = async () => {
            const req = await fetch(`http://localhost:5000/products/${product.id}/images`);
            const res = await req.json();
            setImages(res)
        }
        getImages()
    }, [])

    const stars = (
      <span>{'★'.repeat(product.rating)}</span>
    )
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
        backgroundColor: "black",
        color: "white",
        margin: "1em 0",
      }}
    >
      <img
        style={{ maxWidth: "22em" }}
        src={
          images[0]?.url ||
          "https://media.istockphoto.com/photos/chimpanzee-picture-id170615395?k=20&m=170615395&s=612x612&w=0&h=CswkxjdPpmDOF7FLJ64nuaYrQzsreIS2Ph9KV4ln15g="
        }
        alt=""
      />
      <div style={{ padding: "1em 0em 0.5em 0.5em" }}>
        {" "}
        <span style={{ display: "flex", gap: "3em" }}>
          <h2>{product.name}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "colomn",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {/* <ion-icon name="star"></ion-icon> */}

            <p>{stars}</p>
          </div>
        </span>
        <h2>$ {product.price}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
