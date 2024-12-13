import axios from "axios";
import React, { useEffect, useState } from "react";

const ProfileCard = () => {
  const [profileData, setProfileData] = useState([]);
console.log(profileData)
    useEffect(() => {
      const getFullProfile = async () => {
        try {
          const hackmateMongoId = localStorage.getItem("hackmateMongoId");
  
          if (!hackmateMongoId) {
            console.error("No HackMate ID found in local storage.");
            return;
          }
  
          const res = await axios.post(
            `http://localhost:3000/api/v1/user/me`,
            { id: hackmateMongoId }
          );
          
          // console.log("Data for profile:", res.data);
          setProfileData(res.data.user)
        } catch (error) {
          console.error("Error fetching profile:", error.response?.data || error.message);
        }
      };
  
      getFullProfile();
    }, [])
  
  
  return (
    <>
    <div className="max-w-xs mx-auto bg-gray-900 rounded-lg shadow-lg">
      {/* Background Section */}
      <div className="relative">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D16AQEzUwWI4RLtKw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1728399893043?e=1737590400&v=beta&t=WPBpGp6ojnHuYM4CIyeVFPaX_09EMWIZyPv8I8sm3fI"
          alt="Background"
          className="object-cover w-full h-32 rounded-t-lg"
        />
        {/* Profile Picture */}
        <div className="absolute w-20 h-20 overflow-hidden transform -translate-y-1/2 border-4 border-gray-900 rounded-full top-20 left-4">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQFgUjJjXDA5KA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728398209627?e=1737590400&v=beta&t=VoMR4LDnQa0Usq8pwANtdwdkqBmxoRXNRzDqw-uNCf0"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-4 text-center">
        <h1 className="text-lg font-semibold text-white">{profileData.name}</h1>
        <p className="mt-1 text-sm text-gray-400">
          {/* {profileData.profile.bio || "Add your profile description"} */}
        </p>
        {/* <p className="mt-1 text-sm text-gray-500">{profileData.profile.college || "College"}</p> */}
      </div>
    </div>
    </>
  );
};

export default ProfileCard;
