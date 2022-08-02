import {useState, useEffect} from 'react'

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
        <a style={listItem} href="/">
          <ion-icon name="home-outline"></ion-icon>{" "}
          <span style={sidebarNavItemText}>Home</span>
        </a>
        <a style={listItem} href="/">
          <ion-icon name="search-outline"></ion-icon>{" "}
          <span style={sidebarNavItemText}>Search</span>
        </a>
        <a style={{ ...listItem, ...profileLink }} href="/">
          <ion-icon name="person-circle-outline"></ion-icon>{" "}
          <span style={sidebarNavItemText}>Profile</span>
        </a>
      </ul>
    );
    const closedSidebarList = (
      <ul style={closedListStyle}>
        <a style={listItem} href="/">
          <ion-icon name="home-outline"></ion-icon>
        </a>
        <a style={listItem} href="/">
          <ion-icon name="search-outline"></ion-icon>
        </a>
        <a style={{ ...listItem, ...profileLink }} href="/">
          <ion-icon name="person-circle-outline"></ion-icon>
        </a>
      </ul>
    );
    return (
      <>
        <div
          id="sidebar"
          style={isSidebarOpen ? opensidebarStyle : closedSidebarStyle}
        >
            <button style={toggleSidebarBtn} onClick={toggleSidebar}>
            {isSidebarOpen ? (
                <ion-icon name="chevron-back-circle-outline"></ion-icon>
            ) : (
                <ion-icon name="chevron-forward-circle-outline"></ion-icon>
            )}
            </button>
          {isSidebarOpen ? openedSidebarList : closedSidebarList}
            <button>Sign In</button>
        </div>
      </>
    );
}

export default Sidebar;