import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";

function App() {
  const location = useLocation();
  useEffect(() => {
    const body = document.body;
    if (location.pathname === "/main") {
      body.style.backgroundColor = "black";
    } else if (location.pathname === "/") {
      body.style.backgroundColor = "white";
    }
    return () => {
      body.style.backgroundColor = "";
    };
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
