import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";

function App() {

  return (
    <>
    <Routes>
    <Route path="/main" element={<MainPage/> }></Route>
    <Route path="/" element={<Home/> }></Route>
    </Routes>
    </>
  );
}

export default App;
