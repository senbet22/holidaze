import { API_PROFILE_BOOKINGS, API_PROFILE_UPDATE } from "./constants.mjs";
import { optionGetProfile, optionPut } from "./requestOptions.mjs";

// Fetch profile bookings
export const getProfileBookings = async () => {
  const url = `${API_PROFILE_BOOKINGS}?sort=dateFrom&sortOrder=asc`; // earliest bookings first

  try {
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
    const response = await fetch(API_PROFILE_UPDATE, optionPut(updateData));
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.errors?.[0]?.message || "Failed to update profile");
    }

    return data.data;
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
