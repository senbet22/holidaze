import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.mjs";
import { useDarkMode } from "../hooks/useDarkMode";
import { useAuth } from "../hooks/useAuth";

import NavbarDropdown from "./NavbarDropdown";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  useEffect(() => {
    if (mobileMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenu]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-[60px] bg-secondary text-text shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <div className=" flex   items-center rounded-full text-background h-15 ml-2 gap-2">
            {" "}
            <img
              className=" h-10 shadow-sm shadow-accent rounded-full"
              src={
                isDarkMode ? assets.dunestay_dark_logo : assets.dunestay_logo
              }
              alt=""
            />
            <img
              className=" h-12"
              src={
                isDarkMode
                  ? assets.dunestay_logo_text_dark
                  : assets.dunestay_logo_text
              }
              alt=""
            />
          </div>
        </NavLink>

        <div
          title="Dark Mode Toggle"
          onClick={toggleDarkMode}
          className="ml-auto mx-6 hidden md:flex w-12 bg-accent shadow-sm shadow-black rounded-full  justify-between cursor-pointer"
        >
          <div className={`${isDarkMode ? "ml-auto" : "mr-auto"}`}>
            <img
              className="w-6 "
              src={
                isDarkMode ? assets.dunestay_logo : assets.dunestay_dark_logo
              }
              alt="Toggle Dark Mode"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 mr-2">
          {!isAuthenticated() ? (
            <NavLink to="/Auth">
              <button className="bg-accent text-background hover:  px-8 py-2 rounded-md font-medium cursor-pointer hover:bg-accent transition-colors shadow-sm shadow-black hover:scale-105">
                Login
              </button>
            </NavLink>
          ) : (
            <NavbarDropdown
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <img
          className="md:hidden fixed right-4 cursor-pointer"
          src={isDarkMode ? assets.menu_icon_white : assets.menu_icon}
          alt="Menu"
          onClick={toggleMobileMenu}
        />

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden fixed w-full top-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-primary  to-secondary transition-all flex flex-col">
            <div className="flex justify-end p-4">
              {/* Dark Mode Toggle */}
              <div
                title="Dark Mode Toggle"
                onClick={toggleDarkMode}
                className=" mx-4 mr-auto md:flex w-15 bg-primary shadow-sm shadow-black rounded-full flex justify-between cursor-pointer"
              >
                <div className={`${isDarkMode ? "ml-auto" : "mr-auto"}`}>
                  <img
                    className="w-10"
                    src={
                      isDarkMode
                        ? assets.dunestay_logo
                        : assets.dunestay_dark_logo
                    }
                    alt="Toggle Dark Mode"
                  />
                </div>
              </div>

              {/* Menu Icon */}
              <img
                className="cursor-pointer rounded-lg p-1"
                src={assets.cross_icon}
                alt="Close"
                onClick={toggleMobileMenu}
              />
            </div>

            <ul className="flex flex-col text-[#0b1d2b] items-center gap-2 mt-5 px-5 text-2xl font-medium flex-grow">
              <NavLink onClick={() => setMobileMenu(false)} to="/">
                <p className="px-4 py-2 rounded inline-block">HOME</p>
              </NavLink>
              {isAuthenticated() && (
                <NavLink onClick={() => setMobileMenu(false)} to="/profile">
                  <p className="px-4 py-2 rounded inline-block">PROFILE</p>
                </NavLink>
              )}
              {!isAuthenticated() ? (
                <NavLink onClick={() => setMobileMenu(false)} to="/auth">
                  <p className="px-4 py-2 rounded inline-block">LOGIN</p>
                </NavLink>
              ) : (
                <p
                  className="px-4 py-2 rounded inline-block cursor-pointer"
                  onClick={() => {
                    logout();
                    setMobileMenu(false);
                  }}
                >
                  LOGOUT
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
