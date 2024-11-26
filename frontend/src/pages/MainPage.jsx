import React from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import PostSection from "../components/PostSection";
import MobileBottomNav from "../components/MobileBottomNav"; 
const Home = () => {
  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />
      <div className="container grid grid-cols-1 gap-6 p-6 mx-auto mt-16 md:grid-cols-12">
        <aside
          className="hidden md:col-span-3 rounded-lg shadow-lg bg-[#1b1f23] sticky top-0 h-fit md:block"
        >
          <ProfileCard />
        </aside>

        <main className="bg-black rounded-lg shadow-lg md:col-span-6">
          <PostSection />
        </main>
        <aside
          className="md:col-span-3 bg-[#1b1f23] rounded-lg shadow-lg sticky top-0 h-fit"
        >
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
      <MobileBottomNav />
    </div>
  );
};

export default Home;
