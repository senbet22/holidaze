import VenueCard from "../components/VenueCard";
import SearchBar from "../components/SearchBar";
import LoadMoreButton from "../components/buttons/LoadMoreButton";
import { useVenues } from "../hooks/useVenues.mjs";
import VenueCardSkeleton from "../components/skeletons/VenueCardSkeleton";
import { assets } from "../assets/assets.mjs";

const Home = () => {
  const { venues, isLoading, error, searchVenuesByQuery, loadMore, hasMore } =
    useVenues();

  const handleSearch = (query) => {
    searchVenuesByQuery(query);
  };

  const renderVenueGrid = () => {
    // Initial load (no venues yet, just show skeletons)
    if (isLoading && venues.length === 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <VenueCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    // Empty state
    if (venues.length === 0) {
      return (
        <div className="flex w-full justify-start items-center">
          <img src={assets.no_venue_found} alt="" />
        </div>
      );
    }

    // Normal render with "load more" skeletons
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}

        {/* Skeletons at the bottom when loading more */}
        {isLoading &&
          venues.length > 0 &&
          Array.from({ length: 4 }).map((_, i) => (
            <VenueCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>
    );
  };
  return (
    <div className="flex flex-col justify-between p-2 mt-10 pt-14 bg-background">
      <SearchBar onSearch={handleSearch} />

      <div className="max-w-6xl mx-auto w-full mt-10">
        <h1 className="text-text text-xl">Venues</h1>
        <hr className="bg-primary border-0 h-3 w-15 rounded-br-full" />
      </div>

      {/* grid container */}
      <div className="mt-6 max-w-6xl mx-auto w-full">
        {error ? (
          <p className="text-center w-full text-red-500">{error}</p>
        ) : (
          renderVenueGrid()
        )}
      </div>

      <LoadMoreButton
        onClick={loadMore}
        isLoading={isLoading}
        hasMore={hasMore}
      />
    </div>
  );
};

export default Home;
