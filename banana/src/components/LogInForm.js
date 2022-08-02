import { useState, useContext } from "react";
import {UserContext} from '../pages/App'

const initialData = {
  email: "",
  password: ""
}
const LogInComponent = ({setIsLogIn}) => {
  const {user,setUser} = useContext(UserContext)
  const [formData, setFormData] = useState(initialData)
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormData(initialData);
    const req = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const res = await req.json()
    setUser(res)

  }
    return (
      <div style={{ position: "fixed", top: "25%", left: "45%" }}>
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, 0.263)",
            height: "500px",
            width: "450px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            postion: "relative",
            borderRadius: "10px",
            backgroundColor: "white",
            color: " rgb(252, 225, 128)",
            textShadow: "2px 2px rgba(0, 0, 0, 0.263)",
          }}
        >
          <header>
            <div style={{ textAlign: "center" }}>
              <h4 style={{ fontSize: "4rem", margin: "0" }}>LOGIN</h4>
              <h3 style={{ fontSize: "2rem" }}>Welcome to Banana</h3>
            </div>
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
              />
              <button
                style={{
                  height: "35px",
                  width: "250px",
                  borderRadius: "5px",
                  border: "1px solid rgba(0, 0, 0, 0.263)",
                  backgroundColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                SIGN UP
              </button>
            </form>
            <span
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <p style={{ fontSize: "1.5rem" }}>Need an account?</p>
              <a
                onClick={() => {
                  setIsLogIn((prev) => !prev);
                }}
                style={{ fontSize: "1.5rem" }}
              >
                SIGN UP
              </a>
            </span>
          </header>
        </div>
      </div>
    );
}

export default LogInComponent