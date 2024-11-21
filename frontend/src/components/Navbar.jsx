import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiHome, FiUser, FiBriefcase, FiMessageSquare, FiBell } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { BsFillLaptopFill } from "react-icons/bs";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center h-[55px] justify-between w-full px-6 py-3 bg-[#292929] text-white backdrop-blur-md shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-2">
        <FaLinkedin className="text-2xl text-gray-300" />
        <span className="text-xl font-bold text-gray-100">HackMate</span>
      </div>

      {/* Center Section - Search Bar */}
      <div className="items-center hidden w-1/3 ml-40 md:flex">
        <SearchBar/>
      </div>

      {/* Right Section - Links */}
      <div className="flex space-x-6">
        {[
          { icon: GoHomeFill, label: "Home" },
          { icon: FaUserFriends, label: "My Network" },
          { icon: BsFillLaptopFill, label: "Hackathons", hasBadge: true, badgeCount: 24  },
          { icon: BiSolidMessageRoundedEdit, label: "Messaging" },
          { icon: RxAvatar, label: "Profile"},
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
    </nav>
  );
};

export default Navbar;
