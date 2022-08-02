import Sidebar from '../components/Sidebar'
import ProductContainer from '../components/ProductContainer'
import Home from '../pages/Home'
function App() {
  return (
    <div className="App">
      <Sidebar/> 
      <Home/>
      <ProductContainer/>
    </div>
  );
  }
export default App;
