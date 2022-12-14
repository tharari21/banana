import { useState, useContext } from "react";
import {UserContext} from '../pages/App'
import {NavLink, Redirect} from 'react-router-dom'
const initialData = {
  email: "",
  password: ""
}
const AuthForm = ({type}) => {
  const {user,setUser} = useContext(UserContext)
  const [formData, setFormData] = useState(initialData)
  const [errorMessage, setErrorMessage] = useState('') 

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  errorMessage && setTimeout(() => {
  setErrorMessage('')
}, 3000)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (type === 'signup') {
        const req = await fetch('http://10.129.2.168:4000/signup', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({...formData, isSeller: false})
        })
        const res = await req.json()
        if (res.user) {
          localStorage.setItem('session', JSON.stringify(res))
          setUser(res)

        } else {
          setErrorMessage(res.message)
        }
    } else {
        const req = await fetch('http://10.129.2.168:4000/login', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({...formData, isSeller: false})
        })
        const res = await req.json()
        if (res.user) {
            localStorage.setItem('session', JSON.stringify(res))
            setUser(res)

        } else {
            setErrorMessage(res.message)

        }
    }
    setFormData(initialData);

  }
  const name = (type === 'login') ? "LOGIN" : "SIGN UP"
    return (
      <div style={{ position: "fixed", top: "25%", left: "45%" }}>
        {user && <Redirect to="/"/>}
        {errorMessage && <div style={{position: 'fixed', top: '2em', left: '57%', transform: 'translate(-50%)', backgroundColor: "rgb(252, 225, 128)", color: 'black', padding: '1em 2em'}} ><h2>{errorMessage}</h2></div>}
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.263)",
            height: "500px",
            width: "450px",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            postion: "relative",
            borderRadius: "10px",
            backgroundColor: "rgb(252, 225, 150)",
            color: "black",
            textShadow: "2px 2px rgba(0, 0, 0, 0.263)",
          }}
        >
          <header style={{ textAlign: "center" }}>
              <h4 style={{ fontSize: "4rem", margin: "0" }}>{name}</h4>
              <h3 style={{ fontSize: "2rem" }}>Welcome to Banana</h3>
          </header>

            <form
              action=""
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                style={{
                  height: "30px",
                  width: "250px",
                  borderRadius: "5px",
                  border: "1px solid rgba(0, 0, 0, 0.263)",
                }}
                onChange={handleInput}
                value={formData.email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                style={{
                  height: "30px",
                  width: "250px",
                  borderRadius: "5px",
                  border: "1px solid rgba(0, 0, 0, 0.263)",
                }}
                onChange={handleInput}
                value={formData.password}
              />
              
              <input
                style={{
                  height: "35px",
                  width: "250px",
                  borderRadius: "5px",
                  border: "1px solid rgba(0, 0, 0, 0.263)",
                  backgroundColor: "black",
                  fontWeight: "bold",
                  color: 'white'
                  
                }}
                type="submit"
                value={name}
              />
            </form>
            <span
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
                
              <p style={{ fontSize: "1.5rem" }}>{type==="login" ? "Need an account?" : "Have an account?"}</p>
              <NavLink
                to={type==="login" ? "/signup" : "/login"}
                style={({isActive}) => isActive ? { color: 'black', textDecoration: 'none',fontSize: "1.5rem" } : {color: 'black', textDecoration: 'none',fontSize: "1.5rem"}} 
              >
                {type === "login" ? "SIGN UP" : "LOG IN"}
              </NavLink>
            </span>
        </div>
      </div>
    );
}

export default AuthForm