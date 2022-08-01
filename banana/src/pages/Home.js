const Home = () => {
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis id
            fugiat, pariatur et saepe voluptates numquam. Voluptates ipsa enim
            a.
          </p>
          <span>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                textDecoration: "underline",
                fontSize: '1.3em'
              }}
            >
              Become a seller
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                textDecoration: "underline",
                fontSize: '1.3em'
              }}
            >
              learn more
            </button>
          </span>
        </div>
      </div>
    );
}

export default Home