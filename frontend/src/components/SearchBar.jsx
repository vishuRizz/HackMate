import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ width = "w-64", height = "h-[30px]" }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/search", { params: { query: value } });
      setResults(response.data.users);
      console.log(response.data.users)
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${width}`}>
      {/* Search Input */}
      <label
        className={`flex items-center bg-gray-800 border border-gray-300 rounded-lg px-3 ${height} shadow-sm focus-within:ring focus-within:ring-gray-600`}
      >
        <input
          type="text"
          placeholder="Search for users..."
          value={query}
          onChange={handleSearch}
          className="flex-grow bg-transparent text-gray-200 placeholder-gray-500 outline-none text-sm"
        />
        <kbd className="text-gray-400 bg-gray-700 px-2 py-1 rounded-md text-xs">/</kbd>
      </label>

      {/* Dropdown Results */}
      {results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-160 overflow-y-auto z-50"
        >
          {results.map((user) => (
            <div
            onClick={()=>{
              navigate(`/main/user/profile/${user._id}`)
            }}
              key={user._id}
              className="flex items-center gap-3 p-3 border-b border-gray-700 last:border-none hover:bg-gray-700 cursor-pointer"
            >
              <img
                src={user.profile?.avatar || "https://img.freepik.com/premium-vector/education-design_24877-28980.jpg"}
                alt={user.name}
                className="w-10 h-10 rounded-full bg-gray-600"
              />
              <div className="text-gray-200">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-400">{user.profile?.college || "No College Info"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
