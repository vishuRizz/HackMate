import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";

function App() {

  return (
    <>
    <Routes>
    <Route path="/home" element={<Home/> }></Route>
    <Route path="/" element={<MainPage/> }></Route>
    </Routes>
    </>
  );
}

export default App;
