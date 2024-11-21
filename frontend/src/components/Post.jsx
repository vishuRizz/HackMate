import React from "react";

const Post = ({ author, content, time }) => {
  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-blue-500 rounded-full">
          {author[0]}
        </div>
        <div className="ml-3">
          <p className="font-bold">{author}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Post;
