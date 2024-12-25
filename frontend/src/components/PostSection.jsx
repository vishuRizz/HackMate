import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineComment } from "react-icons/ai";
import CommentSection from "./CommentSection";
import LikeSection from "./LikeSection";
import LoaderTwo from "./Loader";

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/post");
        setPosts(res.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const getRelativeTime = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
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
          <div><LoaderTwo/></div>
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
          post.authorId?.profile.avatar || "https://img.freepik.com/premium-vector/education-design_24877-28980.jpg"
        }
        alt="Author Avatar"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1 ml-3">
        <div className="text-sm font-semibold text-white">
          {post.authorId?.name || "Anonymous"}
        </div>
        <div className="text-[12px] text-slate-300">
          {post.authorId?.profile.college || "Unverified College"}
        </div>
        <div className="text-[12px] text-gray-400">
          {post.authorId?.profile.bio
            ? post.authorId.profile.bio.split(" ").slice(0, 5).join(" ")+"..."
            : ""}
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {getRelativeTime(post.createdAt)}
      </div>
    </div>

    {/* Post Content */}
    <div className="py- px-3">
      <div className="text-white">{post.content}</div>

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

          {/* Looking For Section */}
      {post.lookingFor && (
        <div className="  ">
          <div className="text-sm font-semibold text-white">Looking For:</div>
          <div className="text-sm text-gray-300">{post.lookingFor}</div>
        </div>
      )}

      {/* Like and Comment Buttons */}
      <div className="flex items-center justify-between mt-4 text-white">
        <LikeSection
          postId={post._id}
          likes={post.likes}
          likesCount={post.likesCount}
          setPosts={setPosts}
        />
        <button
          className="flex items-center gap-1 text-sm hover:text-blue-500 transition-colors"
          onClick={() => toggleCommentsVisibility(post._id)}
        >
          <AiOutlineComment />
          {post.comments?.length || 0} Comments
        </button>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-700 mt-2"></div>

    {/* Comments Section */}
    <CommentSection
      postId={post._id}
      comments={post.comments}
      showAll={visibleComments[post._id]}
      setPosts={setPosts}
    />
  </div>
))}
        </div>
      )}
    </>
  );
};

export default PostSection;
