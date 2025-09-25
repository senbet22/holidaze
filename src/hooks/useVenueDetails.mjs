import { useState, useEffect } from "react";
import { fetchVenueById } from "../API/venueService.mjs";

/**
 * Custom hook to fetch and manage venue details.
 *
 * @param {string|number} venueId - The ID of the venue to fetch.
 * @returns {object} { venue, isLoading, error } - Venue data, loading state, and error message.
 */

export const useVenueDetails = (venueId) => {
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVenueDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVenueById(venueId);
        setVenue(data);
      } catch (err) {
        setError("Failed to load venue details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (venueId) {
      getVenueDetails();
    }
  }, [venueId]);

  return { venue, isLoading, error };
};
