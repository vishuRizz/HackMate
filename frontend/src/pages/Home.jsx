import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";


const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Dummy Data
  const profileData = {
    name: "Vishu Pratap",
    email: "vishurizz0@gmail.com",
    posts: [3, 3, 3, 3, 3, 3],
    followers: [4, 43, 43, 43, 2, 2, 1],
    following: [3, 4, 4, 3, 3, 2, 2, 2, 2, 2],
    isAdmin: true,
  };

  const postData = [
    {
      id: "673cdb5ea541286181753b27",
      author: "Vishu Pratap",
      content:
        "Need a backend developer for upcoming amazon hackathon, should be able to work in Node.js",
      tags: ["Backend Developer", "Hackathon"],
      likes: ["User1"],
      comments: ["Count me in!"],
      createdAt: "2024-11-19T18:39:26.626+00:00",
    },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }
    >
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="container grid grid-cols-12 gap-6 p-4 mx-auto mt-20 max-h-44">
        {/* Left Sidebar (Profile) */}
        <aside className="col-span-3 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <ProfileCard />
        </aside>

        {/* Center Feed (Posts) */}
        <main className="col-span-6 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Start a post..."
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          {postData.map((post) => (
            <div
              key={post.id}
              className="p-4 mb-4 rounded-md bg-gray-50 dark:bg-gray-700"
            >
              <h3 className="text-lg font-semibold">{post.author}</h3>
              <p className="mt-2">{post.content}</p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 mr-2 bg-blue-100 rounded dark:bg-blue-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar (Chats) */}
        <aside className="col-span-3 p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold">Chats</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold">John Doe</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hey, let's connect!
                </p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold">Jane Smith</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ready for the hackathon?
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Home;
