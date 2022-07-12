import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import ShowCities from './components/cities/ShowCities';
import AddCity from './components/cities/addCity';
import ShowStates from './components/state/ShowStates'
import AddState from './components/state/AddState';
function App() {
  console.log(process.env.base)
  return (
    <div className="App">
      <Routes>
        <Route path="/cities" element= {<ShowCities/>}></Route>
        <Route path="/addCity" element= {<AddCity/>}></Route>
        <Route path="/states" element= {<ShowStates/>}></Route>
        <Route path="/addState" element= {<AddState/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
