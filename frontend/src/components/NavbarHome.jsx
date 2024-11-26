import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className="w-full h-20 p-[25px] bg-white shadow-md"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="flex items-center justify-between px-6 md:px-24">
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

          {/* Desktop Links */}
          <div
            className="hidden ml-24 text-lg md:flex gap-x-6 text-slate-600"
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

          {/* Desktop Actions */}
          <div className="items-center hidden md:flex gap-x-6">
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

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <FaTimes className="text-2xl text-blue-500" />
              ) : (
                <FaBars className="text-2xl text-blue-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="absolute top-[80px] left-0 w-full bg-white shadow-md md:hidden"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            <div className="flex flex-col items-center gap-6 py-6 text-lg text-slate-600">
              <div className="transition duration-300 cursor-pointer hover:text-blue-500">
                Hackathons
              </div>
              <div className="transition duration-300 cursor-pointer hover:text-blue-500">
                About
              </div>
              <div className="transition duration-300 cursor-pointer hover:text-blue-500">
                Developers
              </div>
              <div className="w-full h-px bg-gray-200"></div>
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
                className="px-6 py-2 text-blue-600 transition duration-300 rounded-lg shadow-md hover:text-white hover:bg-blue-600"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavbarHome;
