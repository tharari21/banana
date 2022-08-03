import {useState, useEffect, useContext} from 'react'
import {UserContext} from '../pages/App'
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";

const Sidebar = () => {
    const {user, setUser} = useContext(UserContext)
    console.log('user in sidebar', user)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }
    useEffect(() => {
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

    const logout = async () => {
      // const req = await fetch('http://localhost:4000/logout');
      // const res = await req.json();
      localStorage.clear();
      setUser(null)
      // console.log(res)

    }
    
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
    const bottomLink1 = {position: 'absolute', bottom: '25px'}
    const bottomLink2 = {position: 'absolute', bottom: '90px'}
    const openedSidebarList = (
      <ul style={openedListStyle}>
        <NavLink style={listItem} to="/products">
          <ion-icon name="pricetags-outline"></ion-icon>{" "}
          <span style={sidebarNavItemText}>PRODUCTS</span>
        </NavLink>
        <NavLink style={listItem} to="/">
          <ion-icon name="home-outline"></ion-icon>{" "}
          <span style={sidebarNavItemText}>HOME</span>
        </NavLink>
        <NavLink style={listItem} to="/cart">
          <ion-icon name="cart-outline"></ion-icon>
          <span style={sidebarNavItemText}>CART</span>
        </NavLink>
        {user ? (
          <>
            <NavLink style={{ ...listItem, ...bottomLink1 }} to="/profile">
              <ion-icon name="person-circle-outline"></ion-icon>{" "}
              <span style={sidebarNavItemText}>PROFILE</span>
            </NavLink>
            <div style={{ ...listItem, ...bottomLink2, cursor: 'pointer' }} to="/logout" onClick={logout}>
              <ion-icon name="log-out-outline"></ion-icon>
              <span style={sidebarNavItemText}>LOGOUT</span>
            </div>
          </>
        ) : (
          <>
            <NavLink style={{ ...listItem, ...bottomLink1 }} to="/login">
              <ion-icon name="log-in-outline"></ion-icon>
              <span style={sidebarNavItemText}>LOGIN</span>
            </NavLink>
            <NavLink style={{ ...listItem, ...bottomLink2 }} to="/signup">
              <ion-icon name="person-add-outline"></ion-icon>
              <span style={sidebarNavItemText}>SIGN UP</span>
            </NavLink>
          </>
        )}
      </ul>
    );
    const closedSidebarList = (
      <ul style={closedListStyle}>
        <NavLink style={listItem} to="/products">
          <ion-icon name="pricetags-outline"></ion-icon>
        </NavLink>
        <NavLink style={listItem} to="/">
          <ion-icon name="home-outline"></ion-icon>
        </NavLink>
        <NavLink style={listItem} to="/cart">
          <ion-icon name="cart-outline"></ion-icon>
        </NavLink>
        {user ? (
          <>
            <NavLink style={{ ...listItem, ...bottomLink1 }} to="/profile">
              <ion-icon name="person-circle-outline"></ion-icon>{" "}
            </NavLink>
            <div style={{ ...listItem, ...bottomLink2, cursor: 'pointer' }} onClick={logout}>
              <ion-icon name="log-out-outline"></ion-icon>
            </div>
          </>
        ) : (
          <>
            <NavLink style={{ ...listItem, ...bottomLink1 }} to="/login">
              <ion-icon name="log-in-outline"></ion-icon>
            </NavLink>
            <NavLink style={{ ...listItem, ...bottomLink2 }} to="/signup">
              <ion-icon name="person-add-outline"></ion-icon>
            </NavLink>
          </>
        )}
      </ul>
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
            {sidebarToggleBtn}
            {isSidebarOpen ? openedSidebarList : closedSidebarList}
        </div>
    );
}

export default Sidebar;