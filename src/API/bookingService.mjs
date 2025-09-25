import { API_BOOKINGS } from "./constants.mjs";
import { optionPost } from "./requestOptions.mjs";

/**
 * Creates a new booking via API.
 *
 * @param {Object} bookingData - Booking details (dateFrom, dateTo, guests, venueId)
 * @returns {Promise<Object>} Created booking data
 * @throws {Error} If booking creation fails
 */

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
