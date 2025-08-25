import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.mjs";
import { useAuth } from "../hooks/useAuth";

const NavbarDropdown = () => {
  const { logout, user } = useAuth();

  const username = user?.name || "Guest";
  const profileImage = user?.avatar?.url || assets.dunestay_logo;

  return (
    <div className="flex items-center gap-2 cursor-pointer group relative">
      <h1 className="text-text font-medium">{username}</h1>
      <img
        className="w-8 h-8 rounded-full object-cover shadow-sm shadow-black"
        src={profileImage}
        alt="Profile"
      />
      <img className="w-10" src={assets.dropdown_icon} alt="Dropdown" />

      <div className="absolute top-0 right-0 pt-12 text-base font-medium text-text z-20 hidden group-hover:block">
        <div className="min-w-48 bg-background rounded-lg shadow-lg flex flex-col gap-2 p-4 border">
          <NavLink to="/MyProfile">
            <p className="hover:text-primary cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors">
              My Profile
            </p>
          </NavLink>
          <hr className="border-gray-200" />
          <p
            onClick={logout}
            className="hover:text-primary cursor-pointer py-2 px-2 rounded hover:bg-gray-50 transition-colors"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavbarDropdown;
