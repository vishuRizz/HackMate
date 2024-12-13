import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileUser from "./pages/ProfileUser";

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
        <Route path="main/user/profile" element={<ProfilePage/>} />
        <Route path="main/user/profile/:id" element={<ProfileUser/>} />
      </Routes>
    </>
  );
}

export default App;
