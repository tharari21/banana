import {useState} from 'react'

const SignUpComponent = () => {
const [user, setUser]= useState({})
const handleInput = (e)=> {
setUser({
  ...user,
  [e.target.name]: e.target.value
})
}

const handleSubmit = (e) => {
e.preventDefault()
// fetch('', {
//   method: 'POST',
//   header: {
//     'Content-type': 'application/json'
//   },
//   body: JSON.stringify(user)
// })

}
console.log(user)
  return (
    <div style={{ position: "fixed",top: "25%", left: "45%" }}>
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
            backgroundColor: "black",
            color: " rgb(252, 225, 128)",
            textShadow: "2px 2px rgba(0, 0, 0, 0.263)",
          }}
        >
          <header style={{ textAlign: "center" }}>
            <div>

              <h4 style={{ fontSize: "4rem", margin: "0" }}>SIGN UP</h4>
              <h3 style={{ fontSize: "2rem" }}>Welcome to Banana</h3>
            </div>
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
                  backgroundColor: "white",
                  fontWeight: "bold",
                }}
              >
                SIGN UP
              </button>
            </form>
            <span
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <p style={{ fontSize: "1.5rem" }}>Already have an account?</p>
              <a
                style={{ fontSize: "1.5rem" }}
              >
                LOGIN
              </a>
            </span>
        </div>
      </div>
  );
};

export default SignUpComponent;
