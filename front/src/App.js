import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import {
  BrowserRouter,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import ListOfCoins from './pages/ListOfCoins';
import CoinDetails from './pages/CoinDetails';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/listOfCoins' element={<ListOfCoins/>} />
          <Route path='/categories/:id' element={<ListOfCoins/>} />
          <Route path='/coins/:id' element={<CoinDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
