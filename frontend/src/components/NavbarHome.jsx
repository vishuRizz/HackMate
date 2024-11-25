import React from "react";

function NavbarHome() {
  return (
    <>
      <nav
        className="w-full h-20 p-[25px]"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex items-center justify-between px-24">
          <div
            className="text-3xl font-bold tracking-wide text-blue-500"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            HackMate
          </div>

          <div
            className="flex ml-24 text-lg gap-x-6 text-slate-600"
            style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 300,
              }}
          >
            <div className="transition duration-300 cursor-pointer hover:text-blue-500">
              Hackathons
            </div>
            <div className="transition duration-300 cursor-pointer hover:text-blue-500">
              About
            </div>
            <div className="transition duration-300 cursor-pointer hover:text-blue-500">
              Developers
            </div>
          </div>

          <div className="flex items-center gap-x-6">
            <div
              className="text-lg text-blue-500 cursor-pointer"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
              }}
            >
              Organise a Hackathon
            </div>
            <button
              className="px-4 py-2 text-blue-600 transition duration-300 rounded-lg shadow-sm hover:text-white hover:bg-blue-600"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarHome;
