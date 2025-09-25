import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

/**
 * Protects routes based on authentication and role.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children - Components to render if access is allowed.
 * @param {boolean} [props.requireVenueManager=false] - If true, restricts access to venue managers.
 */

const ProtectedRoute = ({ children, requireVenueManager = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated()) {
        navigate("/auth");
      } else if (requireVenueManager && !user?.venueManager) {
        navigate("/");
        toast.warning("Restricted to Venue Managers");
      }
    }
  }, [isAuthenticated, isLoading, user, requireVenueManager, navigate]);

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated() ? children : null;
};

export default ProtectedRoute;
