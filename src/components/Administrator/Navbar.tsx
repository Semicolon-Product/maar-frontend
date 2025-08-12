import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const avatarUrl = "https://i.pravatar.cc/150?img=12"; // Placeholder avatar

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUsername(parsed.username || "User");
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 px-6 py-2 flex justify-between items-center text-white">
      <div className="text-xl font-semibold">Administrator Page</div>

      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition-transform duration-200"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md z-50 border overflow-hidden">
            <div className="px-4 py-2 border-b text-sm font-medium">
              Hello, {username}
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
