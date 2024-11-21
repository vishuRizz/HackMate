import React from "react";

const Chats = () => {
  const dummyChats = [
    { id: 1, name: "Alice", lastMessage: "Are you ready for the hackathon?" },
    { id: 2, name: "Bob", lastMessage: "Let’s finalize our project plan." },
    { id: 3, name: "Charlie", lastMessage: "Good luck, team!" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Chats</h2>
      <ul className="space-y-4">
        {dummyChats.map((chat) => (
          <li
            key={chat.id}
            className="flex items-center justify-between p-2 rounded hover:bg-gray-100"
          >
            <div>
              <p className="font-semibold">{chat.name}</p>
              <p className="text-sm text-gray-600">{chat.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-500">2 min ago</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
