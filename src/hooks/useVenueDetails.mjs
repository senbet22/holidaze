import { useState, useEffect } from "react";
import { fetchVenueById } from "../API/venueService.mjs";

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
