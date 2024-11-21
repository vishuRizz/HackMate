import React from "react";

const ProfileCard = () => {
  return (
    <div className="mx-auto overflow-hidden bg-gray-900 rounded-lg shadow-lg ">
    
      <div className="relative">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D16AQEzUwWI4RLtKw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1728399893043?e=1737590400&v=beta&t=WPBpGp6ojnHuYM4CIyeVFPaX_09EMWIZyPv8I8sm3fI" 
          alt="Background"
          className="object-cover w-full h-32"
        />
        <div className="absolute w-20 h-20 mt-[20px] overflow-hidden transform -translate-y-1/2 border-4 border-gray-900 rounded-full top-20 left-4">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQFgUjJjXDA5KA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728398209627?e=1737590400&v=beta&t=VoMR4LDnQa0Usq8pwANtdwdkqBmxoRXNRzDqw-uNCf0"
            alt="Profile"
            className="object-cover w-full h-full "
          />
        </div>
      </div>

      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold text-white">Vishu Pratap</h1>
        <p className="mt-1 text-sm text-gray-400">
          FULL Stack Developer | MORE OF MY BIO
        </p>
        <p className="mt-1 text-sm text-gray-500">Noida, Uttar Pradesh</p>
      </div>

     
    </div>
  );
};

export default ProfileCard;
