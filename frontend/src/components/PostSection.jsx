import React from "react";

const posts = [
  {
    id: 1,
    avatar:
      "https://res.cloudinary.com/demo/image/upload/v1699987341/avatar.jpg", // Cloudinary avatar URL
    name: "Vishu Pratap",
    college: "Bennett University",
    content:
      "🌟 Hacktoberfest 2024: A Day full of Tech Collaboration and Open Source by GDG On Campus, Bennett University! 🌟...",
    postImage:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg", // Cloudinary post image URL
  },
  {
    id: 2,
    avatar:
      "https://res.cloudinary.com/demo/image/upload/v1699987342/avatar2.jpg",
    name: "Avi Shrivastava",
    college: "Bennett University",
    content:
      "🚀 Exploring Open Source: Hacktoberfest 2024 was amazing. Met great minds and contributed to some exciting projects...",
    postImage:
      "https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=",
  },
];

const PostSection = () => {
  return (
    <div className="max-w-[700px] mx-auto px-2 space-y-6">
      <div className="p-3 bg-[#1b1f23] rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src="https://res.cloudinary.com/demo/image/upload/v1699987341/avatar.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <input
            type="text"
            placeholder="Start a post..."
            className="flex-grow px-4 py-2 text-sm  border-[1px]  border-slate-400 text-gray-300 bg-[#1b1f23] rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="overflow-hidden bg-[#1b1f23] rounded-lg shadow-md"
        >
          <div className="flex items-center px-3 py-1 border-b border-gray-700">
            <img
              src={post.avatar}
              alt={`${post.name}'s avatar`}
              className="object-cover w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <div className="mt-2 text-sm font-semibold text-gray-200">
                {post.name}
              </div>
              <p className="mb-2 text-xs text-gray-400">{post.college}</p>
            </div>
          </div>
          <div className="p-3">
            <p className="mb-2 text-sm text-gray-300">{post.content}</p>
            {post.postImage && (
              <img
                src={post.postImage}
                alt="Post content"
                className="rounded-lg w-full max-h-[300px] object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSection;
