import {useState, useEffect, useContext} from 'react'
import {UserContext} from '../pages/App'
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
const Sidebar = () => {
    const user = useContext(UserContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLogIn, setIsLogIn]= useState(true)
    // const [isSingUp, setIsSignUp]= useState(true)
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }
    useEffect(() => {
      console.log(window.innerWidth)
      const handleResize = () => {
        if (window.innerWidth < 1330) {
          setIsSidebarOpen(false);
        } else {
          setIsSidebarOpen(true);
        }
        
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    
    
    const opensidebarStyle = { position: 'fixed', left: '0', top: '0', width: '15%', minWidth: '150px' ,height: '100%', backgroundColor: 'black', transition: '0.3s' }
    const closedSidebarStyle = {
      ...opensidebarStyle,
      width: "5%",
      minWidth: '70px',
    };
    const openedListStyle = {display: 'flex', flexDirection: 'column',  gap: '50px', margin: '8em 0 0 2em', padding: '0'}
    const closedListStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "50px",
      margin: "8em 0 0 0",
      padding: '0'
    };
    const listItem = { color: "white", textDecoration: 'none', fontSize: '2em' };
    const toggleSidebarBtn = {
        // borderRadius: "10px",
        // position: "absolute",
        // right: "0",
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '3em',
        padding: '.1em .1em'
    };
    const sidebarNavItemText = { paddingLeft: ".6em" };
    const profileLink = {position: 'absolute', bottom: '25px'}
    const openedSidebarList = (
      <ul style={openedListStyle}>
          <NavLink style={listItem} to="/">
            <ion-icon name="home-outline"></ion-icon>{" "}
            <span style={sidebarNavItemText}>Home</span>
          </NavLink>
          <NavLink style={listItem} to="/">
            <ion-icon name="search-outline"></ion-icon>{" "}
            <span style={sidebarNavItemText}>Search</span>
          </NavLink>
          <NavLink style={{ ...listItem, ...profileLink }} to="/profile">
            <ion-icon name="person-circle-outline"></ion-icon>{" "}
            <span style={sidebarNavItemText}>Profile</span>
          </NavLink>

      </ul>
    );
    const closedSidebarList = (
      <ul style={closedListStyle}>

        <NavLink style={listItem} to="/">
          <ion-icon name="home-outline"></ion-icon>
        </NavLink>
        <NavLink style={listItem} to="/">
          <ion-icon name="search-outline"></ion-icon>
        </NavLink>
        <NavLink style={{ ...listItem, ...profileLink }} to="/">
          <ion-icon name="person-circle-outline"></ion-icon>
        </NavLink>
      </ul>
    );


    const sidebar = (
      <Router>
        <Switch>
          <Route path="/login" />
          <Route path="/signup" />
          <Route path="/products" />
        </Switch>
        {isSidebarOpen ? openedSidebarList : closedSidebarList}
      </Router>
    );
    const sidebarToggleBtn = (
      <button style={toggleSidebarBtn} onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <ion-icon name="chevron-back-circle-outline"></ion-icon>
        ) : (
          <ion-icon name="chevron-forward-circle-outline"></ion-icon>
        )}
      </button>
    );
    return (
        <div
          id="sidebar"
          style={isSidebarOpen ? opensidebarStyle : closedSidebarStyle}
        >
<<<<<<< HEAD
            {sidebarToggleBtn}
            {sidebar}
          
=======
            <button style={toggleSidebarBtn} onClick={toggleSidebar}>
            {isSidebarOpen ? (
                <ion-icon name="chevron-back-circle-outline"></ion-icon>
            ) : (
                <ion-icon name="chevron-forward-circle-outline"></ion-icon>
            )}
            </button>
          {isSidebarOpen ? openedSidebarList : closedSidebarList}
            <button onClick={()=> {setIsLogIn(prev=> !prev)}}>LOG IN</button>
            {/* <button onClick={()=> {setIsSignUp(prev=> !prev)}}>SIGN UP</button> */}
                {isLogIn && <LogInForm setIsLogIn={setIsLogIn}/>}
                {/* {isSignUp && <LogInForm/>} */}
>>>>>>> c481c50662912d28b4f60ba1f9fc6b1644afcea7
        </div>
    );
}

export default Sidebar;