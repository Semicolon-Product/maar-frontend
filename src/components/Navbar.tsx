
import { FiSearch, FiBell } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-200 dark:bg-gray-900 text-black dark:text-white flex items-center px-4 py-2 shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img src="https://cdn.pixabay.com/photo/2025/09/15/22/27/caveman-9836779_1280.jpg" alt="Logo" className="w-10 h-10" />
        <span className="ml-2 font-bold text-xl">MyApp</span>
      </div>

      {/* Center: Search Box */}
      <div className="flex flex-1 justify-center px-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full dark:bg-gray-800 border border-gray-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white">
          <FiBell size={20} />
        </button>
        <img
          src="https://cdn.pixabay.com/photo/2025/09/15/22/27/caveman-9836779_1280.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full border border-gray-700 cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
