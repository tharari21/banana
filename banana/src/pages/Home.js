import {useState, useEffect, useContext} from 'react'
import { UserContext } from './App';
import { NavLink } from 'react-router-dom';
const Home = () => {
  const {user} = useContext(UserContext)
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            fetch(`http://10.129.2.168:5000/checkout/delete-user-cart?userId=${user.user.id}`, {
              method: 'DELETE'
            }).then(r => r.json())
            .then(data => {
              if (data.deleted) {
                alert("Order placed! You will receive an email confirmation.")
              } else {
                alert('Order placed however could not clear cart for some reason.')
              }
            })
        }
            
        if (query.get("canceled")) {
          alert( "Order canceled -- continue to shop around and checkout when you're ready.")
          
        }
          }, []);
    return (
      <div
        id="home"
        style={{
          backgroundImage: 'url("./logo.png")',
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
          backgroundPositionX: "right",
          backgroundSize: "1500px",
          marginTop: "7rem",
        }}
      >
        <div
          style={{
            marginLeft: "23%",
            paddingTop: "25%",
            maxWidth: "500px",
            color: "black",
          }}
        >
          <p style={{fontSize: '2em'}}>
            Join our community of buyers and sellers that go bananas for good deals.  At Banana we believe in treating our team members as well as our customers.
          </p>
          <span>
           <button style={{
                backgroundColor: "rgb(252, 225, 150)",
                width: '200px',
                height: '50px',
                borderRadius: "14px",
                fontSize: '1.5em',
                margin: '0 .5em',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'black'
              }}>
            <NavLink to="/become-a-seller"
              style={{
                textDecoration: 'none',
                color: 'black'
              }}
            >Become a seller
            </NavLink>
            </button>
            <button style={{
                backgroundColor: "rgb(252, 225, 150)",
                width: '200px',
                height: '50px',
                borderRadius: "14px",
                fontSize: '1.5em',
                margin: '0 .5em',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'black'
              }}>
            <NavLink to="/about"
              style={{
                textDecoration: 'none',
                color: 'black'
              }}
            >
              Our mission
            </NavLink>
            </button>
          </span>
        </div>
      </div>
    );
}

export default Home