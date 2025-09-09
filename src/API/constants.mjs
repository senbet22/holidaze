// Stored API KEY
export const API_KEY = import.meta.env.VITE_API_KEY;
// Base API
export const API_BASE = "https://v2.api.noroff.dev";

// Venue Endpoints
export const API_VENUES = `${API_BASE}/holidaze/venues`;
export const API_BOOKINGS = `${API_BASE}/holidaze/bookings?_venue=true`;

// Profile Endpoints
export const API_PROFILE = `${API_BASE}/holidaze/profiles`;

// Auth Endpoints
export const API_AUTH = `${API_BASE}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login/?_holidaze=true`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;
