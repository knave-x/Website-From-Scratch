import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from "./routes/Home"
const App=()=> {

  console.log("deneme")
  return (
    <div >
      
      <Routes>
        <Route path="/" element={<Home/>} /> 

      </Routes>
    </div> 
  );
}

export default App;
