import axios from "axios";
import { API_VENUES } from "./constants.mjs";

// Fetch all venues
export const fetchAllVenues = async (page = 1, limit = 24) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sort: "created",
      sortOrder: "desc", // Newest Venue first.
    });

    const response = await axios.get(`${API_VENUES}?${params.toString()}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};

// Fetch for all the Venues, when using Search input + params.
export const searchVenues = async (query, page = 1, limit = 24) => {
  try {
    const response = await axios.get(
      `${API_VENUES}/search?q=${query}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching venues:", error);
    throw error;
  }
};

// API endpoint to fetch a specific venue by its ID.
export const fetchVenueById = async (id) => {
  try {
    const response = await axios.get(`${API_VENUES}/${id}?_bookings=true`);
    return response.data.data; // Extracts the venue data from the response
  } catch (error) {
    console.error(`Error fetching venue with ID ${id}:`, error);
    throw error;
  }
};
