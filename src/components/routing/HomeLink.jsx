/**
 * HomeLink component.
 *
 * Wraps a NavLink to the homepage ('/'). If the user is already on the homepage,
 * clicking the link forces a full page reload.
 *
 * @param {object} props - Props passed to the component.
 * @param {React.ReactNode} props.children - The content to render inside the link.
 * @returns {JSX.Element} The NavLink component with custom click behavior.
 */

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
