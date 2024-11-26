import axios from "axios";
import React, { useState, useEffect } from "react";

const PostSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://hackmate-backend.vercel.app/api/v1/post"
        );
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      // Simulate API request to like a post
      const updatedPosts = posts.map((post) =>
        post._id === postId
          ? { ...post, likesCount: (post.likesCount || 0) + 1 }
          : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText) return;
    const updatedPosts = posts.map((post) =>
      post._id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              { text: commentText, authorId: null, createdAt: new Date() },
            ],
          }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-[700px] mx-auto px-4 py-6 space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="overflow-hidden bg-[#1b1f23] rounded-lg shadow-md"
        >
          {/* Post Header */}
          <div className="flex items-center px-4 py-3">
            <img
              src={
                post.authorId?.profile.avatar ||
                "https://via.placeholder.com/40"
              }
              alt="Author Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 ml-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white">
                  {post.authorId?.name || "Anonymous"}
                  {/* { post.authorId?.profile.college <div>
                dcdfd
              </div>} */}
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4">
            <p className="text-white">{post.content}</p>
            {post.tags && (
              <div className="flex flex-wrap gap-2 my-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-[#1b1f24] rounded-full text-white"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-white">
              <button
                className="flex items-center text-sm hover:text-blue-500"
                onClick={() => handleLike(post._id)}
              >
                ❤️ {post.likesCount || 0} Likes
              </button>
              <button
                className="text-sm hover:text-blue-500"
                onClick={() =>
                  document
                    .getElementById(`comments-${post._id}`)
                    .classList.toggle("hidden")
                }
              >
                💬 {post.comments?.length || 0} Comments
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div id={`comments-${post._id}`} className="hidden p-4 bg-[#1b1f23]">
            <div>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="mb-3">
                    <p className="text-sm text-white">{comment.text}</p>
                    <p className="text-xs text-gray-500">
                      {comment.authorId?.name || "Anonymous"} •{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
              )}
            </div>
            <div className="flex items-center mt-3 space-x-2">
              <input
                type="text"
                id={`comment-input-${post._id}`}
                placeholder="Add a comment..."
                className="flex-grow px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-500"
                onClick={() =>
                  handleAddComment(
                    post._id,
                    document.getElementById(`comment-input-${post._id}`).value
                  )
                }
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSection;
