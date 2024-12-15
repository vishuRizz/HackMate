import React, { useState } from "react";
import axios from "axios";

const CommentSection = ({ postId, comments, setPosts }) => {
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const handleComment = async () => {
    const token = localStorage.getItem("firebaseToken");
    if (!token) {
      console.error("No Firebase token found in localStorage.");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/post/comment/${postId}`,
        { text: newComment },
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
            ? { ...post, comments: updatedPost.comments }
            : post
        )
      );
      setNewComment(""); 
    } catch (error) {
      console.error(
        "Error commenting on post:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  const displayedComments = showAllComments
    ? comments
    : comments.slice(-1); 

  return (
    <div className="px-2 bg-[#1b1f23] rounded-md">
      {/* Comments */}
      {comments && comments.length > 0 ? (
        <div className="space-y-1">
          {displayedComments.map((comment, index) => (
            <div
              key={index}
              className="flex items-start gap-[10px] bg-[#1b1f23] p-2 rounded-md"
            >
              <img
                src={
                  comment.authorId?.avatar ||
                  "https://via.placeholder.com/40"
                }
                alt="Comment Author Avatar"
                className="w-7 h-7 rounded-full"
              />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">
                    {comment.authorId?.name || "Anonymous"}
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    •{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
          {comments.length > 2 && (
            <button
              onClick={toggleShowAllComments}
              className="text-sm text-blue-400 hover:underline focus:outline-none"
            >
              {showAllComments ? "Show Less" : "Load More Comments"}
            </button>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}

      {/* Add Comment */}
      <div className="mt-2 flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow p-2 text-sm bg-[#1b1f24] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleComment}
          className="px-3 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
