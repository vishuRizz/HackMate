import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import PostSection from "../components/PostSection";
import MobileBottomNav from "../components/MobileBottomNav";
import { useNavigate } from "react-router";
import PostPopup from "../components/PostAddPop";

const MainPage = () => {
  const [showPostPopup, setShowPostPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please log in first!");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />
      <div className="container grid grid-cols-1 gap-6 p-6 mx-auto mt-16 md:grid-cols-12">
        <aside className="hidden md:col-span-3 rounded-lg shadow-lg bg-[#1b1f23] sticky top-0 h-fit md:block">
          <ProfileCard />
        </aside>

        <main className="bg-black rounded-lg shadow-lg md:col-span-6">
          <div className="p-4 bg-[#1b1f23] rounded-lg shadow-lg mb-6">
            <div className="flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/40" 
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div
                className="flex-grow px-4 py-2 text-sm text-gray-400 bg-[#22272e] rounded-lg cursor-pointer hover:bg-[#2c3238]"
                onClick={() => setShowPostPopup(true)}
              >
                What's on your mind?
              </div>
            </div>
          </div>

          <PostSection />
        </main>

        {/* Chat Sidebar */}
        <aside className="md:col-span-3 bg-[#1b1f23] rounded-lg shadow-lg sticky top-0 h-fit">
          <div className="p-4">
            <h2 className="pb-2 text-lg font-semibold border-b border-gray-700">
              Chat Section
            </h2>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-400">
                Start chatting with your friends here!
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Post Popup */}
      {showPostPopup && (
        <PostPopup
          onClose={() => setShowPostPopup(false)}
         
        />
      )}
    </div>
  );
};

export default MainPage;
