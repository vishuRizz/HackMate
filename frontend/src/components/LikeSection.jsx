import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import axios from "axios";

const LikeSection = ({ postId, likes, likesCount, setPosts }) => {
  const handleLike = async () => {
    const token = localStorage.getItem("firebaseToken");
    if (!token) {
      console.error("No Firebase token found in localStorage.");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/post/like/${postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPost = res.data.post;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id
            ? { ...post, likesCount: updatedPost.likes.length }
            : post
        )
      );
    } catch (error) {
      console.error(
        "Error liking post:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <button
      className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"
      onClick={handleLike}
    >
      {likes.includes(localStorage.getItem("firebaseUid")) ? (
        <AiFillLike className="text-blue-500" />
      ) : (
        <AiOutlineLike />
      )}
      {likesCount || 0} Likes
    </button>
  );
};

export default LikeSection;
