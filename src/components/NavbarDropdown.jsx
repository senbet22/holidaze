import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.mjs";
import { useAuth } from "../hooks/useAuth";

const NavbarDropdown = ({ isDarkMode }) => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const username = user?.name || "Guest";
  const profileImage = user?.avatar?.url || assets.dunestay_logo;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
      >
        <span className="text-text font-medium">{username}</span>
        <img
          className="w-8 h-8 rounded-full object-cover shadow-sm shadow-black"
          src={profileImage}
          alt="Profile Avatar"
        />
        <img
          className={`w-10 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          src={isDarkMode ? assets.dropdown_icon_white : assets.dropdown_icon}
          alt="Dropdown Arrow"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 min-w-48 bg-background rounded-lg shadow-lg flex flex-col p-4 border z-20">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `hover:text-primary cursor-pointer py-2 px-2 rounded transition-colors ${
                isActive ? "bg-secondary" : "hover:bg-gray-50"
              }`
            }
          >
            Home
          </NavLink>

          <hr className="border-accent" />

          <NavLink
            to="/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `hover:text-primary cursor-pointer py-2 px-2 rounded transition-colors ${
                isActive ? "bg-secondary" : "hover:bg-gray-50"
              }`
            }
          >
            My Profile
          </NavLink>

          <hr className="border-accent" />

          {user?.venueManager && (
            <>
              <NavLink
                to="/venueManager"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `hover:text-primary cursor-pointer py-2 px-2 rounded transition-colors ${
                    isActive ? "bg-secondary" : "hover:bg-gray-50"
                  }`
                }
              >
                Manage Venues
              </NavLink>
              <hr className="border-accent" />
            </>
          )}

          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="text-left hover:text-primary cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
