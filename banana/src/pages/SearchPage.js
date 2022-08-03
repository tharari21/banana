import SearchItem from "../components/SearchItem"

const SearchPage = () => {
    return (
<div style={{marginLeft: '10%'}}>
    <nav style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
        <input type="text" style={{height: '30px', width: '600px', border:'1px solid rgba(0,0,0, 0.1)',borderRight: 'none', borderTopLeftRadius: '5px',borderBottomLeftRadius: '5px'}}/>
        <button style={{backgroundColor: 'rgb(252, 225, 128)', margin: '0', border:'1px solid rgba(0,0,0, 0.1)',borderLeft: 'none', borderTopRightRadius: '5px',borderBottomRightRadius: '5px'}}><ion-icon name="search-outline"></ion-icon></button>
    </nav>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2%'}}>
            <SearchItem/>
            
    </div>
</div>
    )
}

export default SearchPage