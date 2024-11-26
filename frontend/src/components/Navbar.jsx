import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { BsFillLaptopFill } from "react-icons/bs";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { FiMenu, FiX } from "react-icons/fi"; // Import Hamburger and Close Icons
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center h-[55px] justify-between w-full px-6 py-3 bg-[#292929] text-white backdrop-blur-md shadow-md">
      {/* Left Section - Logo and Search */}
      <div className="flex items-center flex-grow space-x-4">
        <FaLinkedin className="text-2xl text-gray-300" />
        <span className="text-xl font-bold text-gray-100">HackMate</span>

        {/* Search Bar */}
        <div className="flex-grow hidden ml-4 md:flex">
          <SearchBar />
        </div>
      </div>

      {/* Right Section - Links */}
      <div className="hidden space-x-6 md:flex">
        {[
          { icon: GoHomeFill, label: "Home" },
          { icon: FaUserFriends, label: "My Network" },
          { icon: BsFillLaptopFill, label: "Hackathons", hasBadge: true, badgeCount: 24 },
          { icon: BiSolidMessageRoundedEdit, label: "Messaging" },
          { icon: RxAvatar, label: "Profile" },
        ].map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center transition duration-200 cursor-pointer hover:text-yellow-400"
          >
            <item.icon size={22} className="text-2xl text-gray-300" />
            <span className="text-[12px] text-gray-400">{item.label}</span>
            {item.hasBadge && (
              <span className="absolute -top-2 -right-0 bg-red-600 mt-1 text-[9px] text-white rounded-full px-1.5">
                {item.badgeCount}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        {isMenuOpen ? (
          <FiX
            className="text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <FiMenu
            className="text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[55px] right-0 bg-[#292929] w-full flex flex-col items-center space-y-4 py-4 shadow-md md:hidden">
          {[
            { icon: GoHomeFill, label: "Home" },
            { icon: FaUserFriends, label: "My Network" },
            { icon: BsFillLaptopFill, label: "Hackathons", hasBadge: true, badgeCount: 24 },
            { icon: BiSolidMessageRoundedEdit, label: "Messaging" },
            { icon: RxAvatar, label: "Profile" },
          ].map((item, index) => (
            <div
              key={index}
              className="relative flex items-center space-x-2 text-gray-300 transition duration-200 cursor-pointer hover:text-yellow-400"
              onClick={() => setIsMenuOpen(false)} // Close menu when clicking a link
            >
              <item.icon size={22} />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
