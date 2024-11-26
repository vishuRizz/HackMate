import React, { useState } from "react";
import axios from "axios";

const PostPopup = ({ onClose }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [lookingFor, setLookingFor] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log(tags)

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    if (!content) {
      alert("Post content is required.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("content", content);
      // formData.append("tags", tags.split(",").map((tag) => tag.trim()).join(","));
      formData.append("lookingFor", lookingFor);
  
      if (image) {
        formData.append("image", image); 
      }
  
      const response = await axios.post(
        "https://hackmate-backend.vercel.app/api/v1/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
  
      console.log("Response:", response);  
  
      onClose(); 
    } catch (err) {
      console.error("Error creating post:", err);
      if (err.response) {
        console.error("Response Error:", err.response.data);
        alert(err.response?.data?.message || "Error creating post. Please try again.");
      } else {
        console.error("Network error:", err);
        alert("Network error. Please check your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="w-full h-[37rem] max-w-[600px] p-6 bg-[#1b1f23] rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-semibold text-white">Create Post</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          className="w-full px-4 py-2 h-[10rem] text-sm text-white bg-[#22272e] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
        <div className="mt-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-400">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., React, Node.js"
            className="w-full mt-2 px-4 py-2 text-sm text-white bg-[#22272e] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-400">
            Looking For
          </label>
          <input
            id="lookingFor"
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            placeholder="e.g., Collaboration, Feedback"
            className="w-full mt-2 px-4 py-2 text-sm text-white bg-[#22272e] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-400">
            Upload an Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mt-2 text-sm text-gray-500 bg-[#22272e] border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-500"
          />
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-500 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
