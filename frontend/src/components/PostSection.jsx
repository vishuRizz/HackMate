import axios from "axios";
import React, { useState, useEffect } from "react";
import LoaderTwo from "./Loader";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai"

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [loading, setLoading] = useState(true);
// console.log(posts)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/post"
        );
        setPosts(res.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
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
  
  
  
  
  const toggleCommentsVisibility = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="max-w-[700px] mx-auto px-4 py-6 space-y-3">
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
                      <div className="text-[12px] text-slate-300">
                        {post.authorId?.profile.college
                          ? post.authorId?.profile.college
                          : "Unverified College"}
                      </div>
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

                {/* Post Image */}
                {post.image && (
                  <div className="my-4">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full rounded-lg"
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </div>
                )}

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

                {/* Like and Comment Buttons */}
                <div className="flex items-center justify-between mt-4 text-white">
                  <button
                    className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"
                    onClick={() => handleLike(post._id)}
                  >
                    {post.likes.includes(localStorage.getItem("firebaseUid")) ? (
                      <AiFillLike className="text-blue-500" />
                    ) : (
                      <AiOutlineLike />
                    )}
                    {post.likesCount || 0} Likes
                  </button>
                  <button
                    className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"
                    onClick={() => toggleCommentsVisibility(post._id)}
                  >
                    <AiOutlineComment />
                    {post.comments?.length || 0} Comments
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {visibleComments[post._id] && (
                <div className="p-4 bg-[#1b1f23] rounded-lg space-y-4">
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 bg-[#22272e] p-3 rounded-lg"
                      >
                        <img
                          src={
                            comment.authorId?.avatar ||
                            "https://via.placeholder.com/40"
                          }
                          alt="Comment Author Avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-white">
                              {comment.authorId?.name || "Anonymous"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(comment.createdAt).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}{" "}
                              •{" "}
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-300">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PostSection;
