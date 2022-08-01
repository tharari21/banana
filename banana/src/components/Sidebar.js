import {useState} from 'react'

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    
    
    const opensidebarStyle = { position: 'fixed', left: '0', top: '0', width: '20%',height: '100%', backgroundColor: 'black' }
    const closedSidebarStyle = {
      position: "fixed",
      left: "0",
      top: "0",
      width: "5%",
      height: "100%",
      backgroundColor: "black",
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
    const profileLink = {position: 'absolute', bottom: '0'}
    const openedSidebarList = (
      <ul style={openedListStyle}>
        <a style={listItem} href="/">
          <ion-icon name="home-outline"></ion-icon> Home
        </a>
        <a style={listItem} href="/">
          <ion-icon name="search-outline"></ion-icon> Search
        </a>
        <a style={{ ...listItem, ...profileLink }} href="/">
          <ion-icon name="person-circle-outline"></ion-icon> Profile
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
        </div>
      </>
    );
}

export default Sidebar;