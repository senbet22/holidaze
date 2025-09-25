import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.mjs";
import { useDarkMode } from "../hooks/useDarkMode";

/**
 * Footer component.
 *
 * Displays the website footer with logo, company message,
 * contact information, and copyright notice.
 *
 * @returns {JSX.Element}
 */

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className="bg-primary">
      <div className="md:mx-10 mx-4 sm:mx-[10%]">
        <div className="flex flex-col md:grid grid-cols-[3fr_1fr_1fr] gap-14 py-10 text-base text-[-0b1d2b]">
          {/* Left section */}
          <div>
            <NavLink to="/" className="inline-block w-fit">
              <img
                className="mb-20 w-20 shadow-lg shadow-accent rounded-full"
                src={
                  isDarkMode ? assets.dunestay_dark_logo : assets.dunestay_logo
                }
                alt="Holidaze Logo"
              />
            </NavLink>

            <p className="w-full md:w-2/3 leading-6">
              Welcome to Dunestay, where the magic of the desert meets
              unforgettable stays. Unique dune-side venues, starry skies, and
              warm escapes designed for wonder and adventure.
            </p>
          </div>

          {/* Center section — replaced COMPANY links */}
          <div className="flex flex-col items-start">
            <p className="text-xl font-medium mb-5">OUR PROMISE</p>
            <p className="text-lg leading-6 ">
              Creating meaningful stays that feel personal, sustainable, and
              unforgettable.
            </p>
          </div>

          {/* Right section */}
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2">
              <li>+11 111 11 111</li>
              <li>stay@dune.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright Text */}
        <div>
          <hr className=" text-[-0b1d2b]" />
          <p className="text-[-0b1d2b] py-5 text-sm text-center">
            Copyright 2025 @ Dunestay - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
