import axios from "axios";
import React, { useState, useEffect } from "react";
import LoaderTwo from "./Loader";

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({}); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "https://hackmate-backend.vercel.app/api/v1/post"
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

  const toggleCommentsVisibility = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <>
   { loading? ( 
    <div className="flex items-center justify-center h-full">
    <LoaderTwo/>
    </div>
    ) : <div className="max-w-[700px] mx-auto px-4 py-6 space-y-3">
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
                onClick={() => toggleCommentsVisibility(post._id)}
              >
                💬 {post.comments?.length || 0} Comments
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
                          {new Date(comment.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          • {new Date(comment.createdAt).toLocaleDateString()}
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

              {/* Add Comment Section */}
              <div className="mt-4">
                <div className="flex items-start space-x-3">
                  <img
                    src="https://via.placeholder.com/40" // Replace with current user avatar
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-grow">
                    <textarea
                      id={`comment-input-${post._id}`}
                      placeholder="Write a comment..."
                      rows="2"
                      className="w-full px-4 py-2 text-sm text-white bg-[#22272e] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-500"
                        onClick={() =>
                          handleAddComment(
                            post._id,
                            document.getElementById(
                              `comment-input-${post._id}`
                            ).value
                          )
                        }
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div> }
    </>
  );
  
};


export default PostSection;
