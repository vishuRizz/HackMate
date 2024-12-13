import React, { useState } from "react";
import axios from "axios";

const ProfileUpdate = ({ profile, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    bio: profile.profile?.bio || "",
    skills: profile.profile?.skills?.join(", ") || "",
    college: profile.profile?.college || "",
    socialLinks: profile.profile?.socialLinks || {},
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const skillsArray = formData.skills
        ? formData.skills.split(",").map((skill) => skill.trim())
        : [];
      const updatedProfileData = {
        bio: formData.bio || undefined,
        skills: skillsArray.length > 0 ? skillsArray : undefined,
        college: formData.college || undefined,
        socialLinks: formData.socialLinks || undefined,
      };

      const res = await axios.put(
        `http://localhost:3000/api/v1/user/profile`,
        updatedProfileData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Profile updated successfully.");
      onUpdate(res.data.updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-100">Update Profile</h2>

      {/* Bio */}
      <div>
        <label className="block text-gray-400">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 text-gray-100 rounded"
        ></textarea>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-gray-400">Skills (comma-separated)</label>
        <input
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 text-gray-100 rounded"
        />
      </div>

      {/* College */}
      <div>
        <label className="block text-gray-400">College</label>
        <input
          name="college"
          value={formData.college}
          onChange={handleChange}
          className="w-full p-2 bg-gray-700 text-gray-100 rounded"
        />
      </div>

      {/* Social Links */}
      <div>
        <label className="block text-gray-400">Social Links</label>
        {Object.keys(formData.socialLinks).map((key) => (
          <div key={key} className="flex items-center gap-2 mt-2">
            <label className="text-gray-400">{key}</label>
            <input
              name={`socialLinks.${key}`}
              value={formData.socialLinks[key] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialLinks: {
                    ...formData.socialLinks,
                    [key]: e.target.value,
                  },
                })
              }
              className="flex-1 p-2 bg-gray-700 text-gray-100 rounded"
            />
          </div>
        ))}
      </div>

      {/* Save Changes */}
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 rounded-lg"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileUpdate;
