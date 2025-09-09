import { API_PROFILE } from "./constants.mjs";
import { optionGetProfile, optionPut } from "./requestOptions.mjs";
import { getProfileName } from "./sessionStorage.mjs";

// Fetch profile bookings
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

// Update profile (bio + avatar)
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
