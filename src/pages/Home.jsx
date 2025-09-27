import VenueCard from "../components/home/VenueCard";
import SearchBar from "../components/home/SearchBar";
import LoadMoreButton from "../components/buttons/LoadMoreButton";
import { useVenues } from "../hooks/useVenues.mjs";
import VenueCardSkeleton from "../components/skeletons/VenueCardSkeleton";
import { assets } from "../assets/assets.mjs";

/**
 * Home page component.
 *
 * Displays a searchable, paginated grid of venues
 * with loading states and empty/error handling.
 *
 * @returns {JSX.Element}
 */

const Home = () => {
  const { venues, isLoading, error, searchVenuesByQuery, loadMore, hasMore } =
    useVenues();

  const handleSearch = (query) => {
    searchVenuesByQuery(query);
  };

  const renderVenueGrid = () => {
    // Initial load skeletons.
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
          <img src={assets.no_venue_found} alt="No Venue Found" />
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
    <>
      <title>Dunestay</title>
      <div className="min-h-screen bg-background mt-20 pb-8">
        {/* Header Section */}
        <section className="pt-20 mb-4">
          <div className="max-w-6xl mx-auto px-4">
            <SearchBar onSearch={handleSearch} />

            <div className="mt-10">
              <h1 className="text-text font-medium text-xl">Venues</h1>
              <hr className="bg-primary border-0 h-3 w-15 rounded-br-full" />
            </div>
          </div>
        </section>

        {/* Venues Grid Section */}
        <section className="pb-8">
          <div className="max-w-6xl mx-auto px-4">
            {error ? (
              <p className="text-center w-full text-red-500">{error}</p>
            ) : (
              renderVenueGrid()
            )}
          </div>
        </section>

        {/* Load More Section */}
        <LoadMoreButton
          onClick={loadMore}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      </div>
    </>
  );
};

export default Home;
