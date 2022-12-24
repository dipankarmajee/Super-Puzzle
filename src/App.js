import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SupperPuzzle from "./components/SupperPuzzle";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/super-puzzle" element={<SupperPuzzle />} />
    </Routes>
  </BrowserRouter>
);

export default App;
