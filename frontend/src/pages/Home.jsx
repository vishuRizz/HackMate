import React from "react";
import NavbarHome from "../components/NavbarHome";
import Hero from "../components/home/Hero";

function MainPage() {
  return (
    <div>
      <div className="sticky z-10 ">
        <NavbarHome />
      </div>
      <div>
        <Hero/>
      </div>
    </div>
  );
}

export default MainPage;
