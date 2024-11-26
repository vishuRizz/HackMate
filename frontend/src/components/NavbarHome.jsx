import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";

function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popupComponent, setPopupComponent] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openPopup = (component) => {
    setPopupComponent(component);
  };

  const closePopup = () => {
    setPopupComponent(null);
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
              onClick={() => openPopup(<Login />)}
              className="px-4 py-2 text-blue-600 transition duration-300 rounded-lg shadow-sm hover:text-white hover:bg-blue-600"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
              }}
            >
             Register
            </button>
            <button
              onClick={() => openPopup(<Register />)}
              className="px-4 py-2 text-blue-600 transition duration-300 rounded-lg shadow-sm hover:text-white hover:bg-blue-600"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
              }}
            >
              Login
            </button>
          </div>

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
              <button
                onClick={() => openPopup(<Login />)}
                className="px-6 py-2 text-blue-600 transition duration-300 rounded-lg shadow-md hover:text-white hover:bg-blue-600"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                }}
              >
                Register
              </button>
              <button
                onClick={() => openPopup(<Register />)}
                className="px-6 py-2 text-blue-600 transition duration-300 rounded-lg shadow-md hover:text-white hover:bg-blue-600"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {popupComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full h-auto max-w-[29.5rem] p-2 mx-2 overflow-hidden bg-white rounded-md shadow-lg">
            <button
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-800 focus:outline-none"
              onClick={closePopup}
            >
              ✖
            </button>
            <div className="overflow-y-auto max-h-[90vh]">{popupComponent}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavbarHome;
