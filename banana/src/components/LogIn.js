const LogInComponent = () => {
    return (
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
        }}
      >
        <header>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ fontSize: "2rem" }}>LOGIN</h4>
            <h3>Welcome to Banana</h3>
          </div>
          <form
            action=""
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="email"
              placeholder="Email"
              style={{
                height: "30px",
                width: "250px",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.263)",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              style={{
                height: "30px",
                width: "250px",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.263)",
              }}
            />
            <button
              style={{
                height: "30px",
                width: "250px",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.263)",
                backgroundColor: "transparent",
              }}
            >
              SIGN UP
            </button>
          </form>
          <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <p>Need an account?</p>
            <a href="">SIGN UP</a>
          </span>
        </header>
      </div>
    );
}

export default LogInComponent