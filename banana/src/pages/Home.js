const Home = () => {
    return (
      <div
        id="home"
        style={{
          backgroundImage:
            'url("./logo.png")',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100%',
            backgroundPositionX: 'right',
            backgroundSize: '1500px',
            marginTop: '7rem',
        }}
      >
        <p style={{marginLeft: '23%', paddingTop: '30%', maxWidth: '500px', color: 'black'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis id fugiat, pariatur et saepe voluptates numquam. Voluptates ipsa enim a.</p>
      </div>
    );
}

export default Home