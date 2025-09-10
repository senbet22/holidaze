// This Reloads the page when you click on the Logo even when youre lready in '/' homepage.

import { NavLink, useLocation } from "react-router-dom";

const HomeLink = ({ children, ...props }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault(); // prevent normal NavLink behavior
      window.location.reload(); // force refresh
    }
  };

  return (
    <NavLink to="/" onClick={handleClick} {...props}>
      {children}
    </NavLink>
  );
};

export default HomeLink;
