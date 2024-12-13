import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProfilePopup from "../components/UpdateProfilePopup";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [showAvatarUpdate, setShowAvatarUpdate] = useState(false);

  useEffect(() => {
    const getFullProfile = async () => {
      try {
        const hackmateMongoId = localStorage.getItem("hackmateMongoId");

        if (!hackmateMongoId) {
          console.error("No HackMate ID found in local storage.");
          return;
        }

        const res = await axios.post(`http://localhost:3000/api/v1/user/me`, {
          id: hackmateMongoId,
        });
        // console.log("Data for profile:", res.data);
        setProfile(res.data.user);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
        setLoading(false);
      }
    };

    getFullProfile();
  }, []);

  const handleAvatarUpdate = async (newAvatar) => {
    try {
      const formData = new FormData();
      formData.append("avatar", newAvatar);

      const res = await axios.post(
        `http://localhost:3000/api/v1/user/upload-avatar`,
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Avatar updated successfully.");
      setProfile((prev) => ({
        ...prev,
        profile: { ...prev.profile, avatar: res.data.avatarUrl },
      }));
      setShowAvatarUpdate(false);
    } catch (error) {
      console.error("Error updating avatar:", error.response?.data || error.message);
      alert("Failed to update avatar.");
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading your profile data...</div>;
  }

  if (!profile) {
    return <div className="text-center mt-20 text-lg">Profile not found.</div>;
  }

  const { name, email, profile: { bio, college, skills, socialLinks, avatar } } = profile;

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center min-h-screen bg-gray-900 mt-10 text-white p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="text-center">
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500 cursor-pointer"
            onClick={() => setShowAvatarUpdate(true)}
          />
          <h1 className="text-2xl font-bold mt-4">{name}</h1>
          <p className="text-gray-400">{college || "No college specified"}</p>
          <p className="text-gray-500">{email}</p>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-indigo-400">Bio</h2>
          <p className="text-gray-300 mt-2">{bio || "No bio available."}</p>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-indigo-400">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-600 text-indigo-100 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-300">No skills added.</p>
            )}
          </div>
        </div>

       {/* Social Links */}
<div className="mt-6">
  <h2 className="text-xl font-semibold text-indigo-400">Social Links</h2>
  {socialLinks && Object.keys(socialLinks).length > 0 ? (
    Object.keys(socialLinks).map((key) => (
      <div key={key} className="mt-2">
        <a
          href={socialLinks[key]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline"
        >
          {key}: {socialLinks[key]}
        </a>
      </div>
    ))
  ) : (
    <p className="text-gray-300 mt-2">No social links available.</p>
  )}
</div>

        {/* Update Profile Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowProfileUpdate(true)}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Avatar Update Modal */}
      {showAvatarUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-white mb-4">Update Avatar</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleAvatarUpdate(e.target.files[0])}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowAvatarUpdate(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Update Modal */}
      {showProfileUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <UpdateProfilePopup
              profile={profile}
              onClose={() => setShowProfileUpdate(false)}
              onUpdate={(updatedProfile) => {
                setProfile(updatedProfile);
                setShowProfileUpdate(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Profile;
