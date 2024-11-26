import React from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

const MobileBottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex items-center justify-around w-full h-14 bg-[#292929] text-gray-300 md:hidden">
      {[
        { icon: GoHomeFill, label: "Home" },
        { icon: FaUserFriends, label: "Network" },
        { icon: BiSolidMessageRoundedEdit, label: "Chat" },
        { icon: RxAvatar, label: "Profile" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center transition duration-200 cursor-pointer hover:text-yellow-400"
        >
          <item.icon size={22} />
          <span className="text-[10px]">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default MobileBottomNav;
