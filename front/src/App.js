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

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage/>} />
          <Route exact path='/listOfCoins' element={<ListOfCoins/>} />
          <Route path='/categories/:id' element={<ListOfCoins/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
