import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import {Cities} from './Cities';
import "./global.css";

export interface WeatherCardProps {
  city: string;
}

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/city/:cityname" element={<Cities/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
