import { API_VENUES, API_PROFILE } from "./constants.mjs";
import { getProfileName } from "./sessionStorage.mjs";
import {
  optionPost,
  optionGetProfile,
  optionDelete,
  optionPut,
} from "./requestOptions.mjs";

/**
 * Venue management service functions.
 *
 * Provides CRUD operations for venues including create, read, update, and delete.
 * Handles profile-specific venue retrieval and error management for all operations.
 */

/**
 * Creates a new venue
 * @param {Object} venueData - The venue data to create
 * @returns {Promise<Object>} The created venue data
 */
export const createVenue = async (venueData) => {
  try {
    const response = await fetch(API_VENUES, optionPost(venueData));

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${errorData.statusCode}: ${errorData.status}. ${
          errorData.errors?.[0]?.message || errorData.message
        }`
      );
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

/**
 * Gets all venues for the logged-in user's profile.
 *
 * @returns {Promise<Array>} Array of user's venues with booking data
 * @throws {Error} If no profile found or fetch fails
 */
export const getProfileVenues = async () => {
  try {
    const profileName = getProfileName();
    if (!profileName) throw new Error("No logged-in profile");

    const url = `${API_PROFILE}/${profileName}/venues?_bookings=true`;
    const response = await fetch(url, optionGetProfile());

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();

    return result.data || [];
  } catch (error) {
    console.error("Error fetching profile venues:", error);
    throw error;
  }
};

/**
 * Deletes a venue by ID.
 *
 * @param {string} venueId - ID of the venue to delete
 * @returns {Promise<boolean>} True if deletion successful
 * @throws {Error} If deletion fails
 */
export const deleteVenue = async (venueId) => {
  try {
    const response = await fetch(`${API_VENUES}/${venueId}`, optionDelete);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Failed to delete venue (status: ${response.status})`
      );
    }

    return true;
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
};

/**
 * Updates an existing venue.
 *
 * @param {string} venueId - ID of the venue to update
 * @param {Object} venueData - Updated venue data
 * @returns {Promise<Object>} Updated venue data
 * @throws {Error} If update fails
 */
export const editVenue = async (venueId, venueData) => {
  try {
    const response = await fetch(
      `${API_VENUES}/${venueId}`,
      optionPut(venueData)
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${errorData.statusCode}: ${errorData.status}. ${
          errorData.errors?.[0]?.message || errorData.message
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error;
  }
};
