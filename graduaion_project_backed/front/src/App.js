import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import ShowCities from './components/cities/ShowCities';
import AddCity from './components/cities/addCity';
import EditCity from './components/cities/EditCity';
import AddStatus from './components/cities/EditCity'


function App() {
  console.log(process.env.base)
  return (
    <div className="App">
      <Routes>
        <Route path="/cities" element= {<ShowCities/>}></Route>
        <Route path="/addCity" element= {<AddCity/>}></Route>
        <Route path="/editCity/:id" element= {<EditCity/>}></Route>
        <Route path="/AddStatus" element= {<AddStatus/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
