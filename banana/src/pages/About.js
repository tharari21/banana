const About = () => {
return (
    <div style={{marginLeft: '10%', color: 'rgb(252, 225, 128)', height: '100vh', overflow: 'hidden',position: 'relative'}}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(0,0,0,0.2)'  }}>
            <h1 style={{fontSize: '8rem',  marginTop: '8rem'}}>Welcome to Banana</h1>
            <p style={{fontSize: '2rem', width: '70%'}}>At Banana our promise is to give our customers an expirence, and prices that they will simply go bananaz for.  We strive to provide the lowest prices while ethically sourcing all our meterials.  It as a Banana promise to always treat our employees at every level with care.  We don't monkey around when it comes to the enviroment either, we are completely carbon nuetral.</p>
        </div>
        <img style={{position: 'absolute', top: '0', right: '0', width: '100vw', zIndex: '-2'}} src="https://images.pexels.com/photos/6571605/pexels-photo-6571605.jpeg" alt="" />
    </div>
)
}

export default About