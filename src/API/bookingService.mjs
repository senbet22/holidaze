import { API_BOOKINGS } from "./constants.mjs";
import { optionPost } from "./requestOptions.mjs";

export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(API_BOOKINGS, optionPost(bookingData));
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.errors?.[0]?.message || "Failed to create booking");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
