import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Pricing from "./routes/Pricing";
import Training from "./routes/Training";
import Contact from "./routes/Contact";
import Iss from "./routes/Iss";
const App = () => {
  console.log("deneme");
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="training" element={<Training />} />
        <Route path="contact" element={<Contact />} />
        <Route path="iss" element={<Iss/>}/>
      </Routes>
    </div>
  );
};

export default App;
