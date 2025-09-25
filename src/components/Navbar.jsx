import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.mjs";
import { useDarkMode } from "../hooks/useDarkMode";
import { useAuth } from "../hooks/useAuth";
import HomeLink from "./routing/HomeLink";
import NavbarDropdown from "./NavbarDropdown";

/**
 * Navbar component.
 *
 * Renders the main navigation bar with logo, dark mode toggle,
 * authentication links, and responsive mobile menu.
 *
 * @returns {JSX.Element}
 */

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isAuthenticated, logout, user } = useAuth();
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
    <nav className="fixed top-0 left-0 w-full z-50 h-[80px] content-center bg-secondary text-text shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <HomeLink to="/">
          <div className=" flex   items-center rounded-full text-background h-15 ml-2 gap-2">
            {" "}
            <img
              className=" h-10 shadow-sm shadow-accent rounded-full"
              src={
                isDarkMode ? assets.dunestay_dark_logo : assets.dunestay_logo
              }
              alt="Dunestay Logo"
            />
            <img
              className=" h-12"
              src={
                isDarkMode
                  ? assets.dunestay_logo_text_dark
                  : assets.dunestay_logo_text
              }
              alt="Dunestay Logo Text"
            />
          </div>
        </HomeLink>
        {/* Dark mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="ml-auto mx-6 hidden md:flex w-12 bg-accent shadow-sm shadow-black rounded-full justify-between cursor-pointer 
             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <div className={`${isDarkMode ? "ml-auto" : "mr-auto"}`}>
            <img
              className="w-6"
              src={
                isDarkMode ? assets.dunestay_logo : assets.dunestay_dark_logo
              }
              alt="Toggle Dark Mode"
            />
          </div>
        </button>

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
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="mx-4 mr-auto md:flex w-15 bg-primary shadow-sm shadow-black rounded-full flex justify-between cursor-pointer 
             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
              </button>

              {/* Menu Icon */}
              <img
                className="cursor-pointer rounded-lg p-1"
                src={assets.cross_icon}
                alt="Close"
                onClick={toggleMobileMenu}
              />
            </div>

            <ul className="flex flex-col text-text items-center gap-2 mt-5 px-5 text-2xl font-medium flex-grow">
              <NavLink onClick={() => setMobileMenu(false)} to="/">
                <p className="px-4 py-2 rounded inline-block">HOME</p>
              </NavLink>

              {isAuthenticated() && (
                <>
                  <NavLink onClick={() => setMobileMenu(false)} to="/profile">
                    <p className="px-4 py-2 rounded inline-block">PROFILE</p>
                  </NavLink>

                  {/* Venue Manager Link */}
                  {user?.venueManager && (
                    <NavLink
                      onClick={() => setMobileMenu(false)}
                      to="/venuemanager"
                    >
                      <p className="px-4 py-2 rounded inline-block">
                        MANAGE VENUES
                      </p>
                    </NavLink>
                  )}
                </>
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
