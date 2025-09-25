import { optionGet } from "./requestOptions.mjs";
import { API_VENUES } from "./constants.mjs";

/**
 * Venue data fetching service.
 */

/**
 * Fetches paginated venues, newest first.
 *
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Venues data with pagination
 * @throws {Error} If fetch fails
 */
export const fetchAllVenues = async (page = 1, limit = 24) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sort: "created",
      sortOrder: "desc", // Newest Venue first.
    });

    const response = await fetch(
      `${API_VENUES}?${params.toString()}`,
      optionGet
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};

/**
 * Searches venues by query with pagination.
 *
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Search results with pagination
 * @throws {Error} If search fails
 */
export const searchVenues = async (query, page = 1, limit = 24) => {
  try {
    const response = await fetch(
      `${API_VENUES}/search?q=${query}&page=${page}&limit=${limit}`,
      optionGet
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error searching venues:", error);
    throw error;
  }
};

/**
 * Fetches single venue by ID with bookings.
 *
 * @param {string} id - Venue ID
 * @returns {Promise<Object>} Venue data with bookings
 * @throws {Error} If fetch fails
 */
export const fetchVenueById = async (id) => {
  try {
    const response = await fetch(
      `${API_VENUES}/${id}?_bookings=true`,
      optionGet
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data.data; // Extracts the venue data from the response
  } catch (error) {
    console.error(`Error fetching venue with ID ${id}:`, error);
    throw error;
  }
};
