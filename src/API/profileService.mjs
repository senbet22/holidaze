import { API_PROFILE } from "./constants.mjs";
import { optionGetProfile, optionPut } from "./requestOptions.mjs";
import { getProfileName } from "./sessionStorage.mjs";

/**
 * Profile service for bookings and profile updates.
 */

/**
 * Gets user's bookings with venue data.
 *
 * @returns {Promise<Array>} User bookings sorted by date
 * @throws {Error} If fetch fails
 */
export const getProfileBookings = async () => {
  try {
    const profileName = getProfileName();
    if (!profileName) throw new Error("No logged-in profile");

    const url = `${API_PROFILE}/${profileName}/bookings?_venue=true&sort=dateFrom&sortOrder=asc`;
    const response = await fetch(url, optionGetProfile());
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.errors?.[0]?.message || "Failed to fetch bookings");
    }

    return data.data;
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

/**
 * Updates user profile data.
 *
 * @param {Object} updateData - Profile data to update
 * @returns {Promise<Object>} Updated profile data
 * @throws {Error} If update fails
 */
export const updateProfile = async (updateData) => {
  try {
    const profileName = getProfileName();
    if (!profileName) throw new Error("No logged-in profile");

    const url = `${API_PROFILE}/${profileName}`;
    const response = await fetch(url, optionPut(updateData));
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.errors?.[0]?.message || "Failed to update profile");
    }

    return data.data;
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
