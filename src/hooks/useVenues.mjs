import { useState, useEffect } from "react";
import { fetchAllVenues, searchVenues } from "../API/venueService.mjs";

/**
 * Custom hook for fetching, searching, and paginating venues.
 *
 * @returns {object} {
 *   venues: Array,            // Loaded venue objects
 *   meta: Object,             // Pagination metadata
 *   isLoading: boolean,       // Loading state
 *   error: string|null,       // Error message if any
 *   searchVenuesByQuery: Function, // Search venues by query
 *   loadMore: Function,       // Load next page of venues
 *   hasMore: boolean          // True if more pages are available
 * }
 */

export const useVenues = () => {
  const [venues, setVenues] = useState([]);
  const [meta, setMeta] = useState({
    currentPage: 1,
    isLastPage: false,
    pageCount: 1,
    totalCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const ITEMS_PER_PAGE = 24;

  const loadVenues = async (page = 1, newSearch = false) => {
    setIsLoading(true);
    try {
      let response;

      if (searchQuery) {
        response = await searchVenues(searchQuery, page, ITEMS_PER_PAGE);
      } else {
        response = await fetchAllVenues(page, ITEMS_PER_PAGE);
      }

      const newVenues = newSearch
        ? response.data
        : [...venues, ...response.data];

      setVenues(newVenues);
      setMeta(response.meta);
    } catch (err) {
      setError("Failed to load venues");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadVenues(1, true);
  }, []);

  const searchVenuesByQuery = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      loadVenues(1, true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchVenues(query, 1, ITEMS_PER_PAGE);
      setVenues(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError("Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!meta.isLastPage) {
      loadVenues(meta.nextPage);
    }
  };

  return {
    venues,
    meta,
    isLoading,
    error,
    searchVenuesByQuery,
    loadMore,
    hasMore: !meta.isLastPage,
  };
};
