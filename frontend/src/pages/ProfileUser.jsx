import React, { useEffect, useState } from "react";
import axios from "axios"
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const ProfileUser = () => {
  const idObject = useParams()
  const id = idObject.id
  console.log(id)

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getFullProfile = async () => {
      try {
        const hackmateMongoId = localStorage.getItem("hackmateMongoId");

        if (!hackmateMongoId) {
          console.error("No HackMate ID found in local storage.");
          return;
        }

        const res = await axios.get(`http://localhost:3000/api/v1/user/profile/${id}`, {
          id: hackmateMongoId,
        });
        console.log("Data for profile:", res.data);
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

      </div>
    </div>
    </>
  );
};

export default ProfileUser;
