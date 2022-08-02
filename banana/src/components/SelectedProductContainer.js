const SelectedProductContainer = () => {

 return (
   <div>
     <h2>Name of Product</h2>
     <span>* 4.91 Number of reviews</span>
     <div id="SelectedProductImageContainer">
       <img src="" alt="" />
       <div id="SelectedProductImageContainerRight">
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <button>Show All Photos</button>
       </div>
     </div>
     <div id="description-area">
        <div id="description-text-area">
            <p>description</p>
            <p>rating drop down?</p>
        </div>
        <div id="price-model">
            <h3>Price</h3>
            <p>* price number of reviews</p>
            <button>Add to cart</button>
            <button>Buy now</button>

        </div>
     </div>
     <div id="related-products">Auto generated products</div>
   </div>
 );   
}

export default SelectedProductContainer