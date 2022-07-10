import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import ShowCities from './components/cities/ShowCities';
function App() {
  console.log(process.env.base)
  return (
    <div className="App">
      <Routes>
        <Route path="/cities" element= {<ShowCities/>}></Route>
        <Route path="/addCity" element= {<ShowCities/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
