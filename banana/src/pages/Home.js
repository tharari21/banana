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
            Join our community of buyers and sellers to purchase from a a company that cares about their footprint on earth.  At Banana we believe in treating our team members as well as our customers.
          </p>
          <span>
            <button
              style={{
                backgroundColor: "rgb(252, 225, 150)",
                width: '200px',
                height: '50px',
                borderRadius: "14px",
                fontSize: '1.5em',
                margin: '0 .5em'
              }}
            >
              Become a seller
            </button>
            <button
              style={{
                backgroundColor: "rgb(252, 225, 150)",
                width: '200px',
                height: '50px',
                borderRadius: "14px",
                fontSize: '1.5em',
                margin: '0 .5em'
              }}
            >
              Our mission
            </button>
          </span>
        </div>
      </div>
    );
}

export default Home