import { useParams } from "react-router-dom";
import { useVenueDetails } from "../hooks/useVenueDetails.mjs";
import LocationMap from "../components/VenueDetail/LocationMap";
import { useDarkMode } from "../hooks/useDarkMode";
import ReserveButton from "../components/buttons/ReserveButton";
import BookingCalendar from "../components/VenueDetail/BookingCalendar";
import { assets } from "../assets/assets.mjs";
import VenueFeatures from "../components/VenueDetail/VenueFeatures";
import ImageCarousel from "../components/VenueDetail/ImageCarousel";
import VenueDetailSkeleton from "../components/skeletons/VenueDetailSkeleton";

const VenueDetail = () => {
  const { isDarkMode } = useDarkMode();

  const { id } = useParams();

  const { venue, isLoading, error: fetchError } = useVenueDetails(id);

  if (isLoading) return <VenueDetailSkeleton />;
  if (fetchError)
    return <div className="text-center p-8 text-red-500">{fetchError}</div>;
  if (!venue)
    return (
      <div className="text-center p-4 my-20">
        <img src={assets.no_venue_found} alt="No venue Found" />
      </div>
    );

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) return dateString;

      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  };

  return (
    <article className="bg-background">
      {/* Dynamic page title */}
      <title>{venue.name}</title>
      <div className="max-w-6xl mx-auto mt-20 py-10 bg-background text-text shadow-sm">
        <header>
          <h1 className="text-xl pt-12 mb-4 mx-2 sm:font-semibold font-bold line-clamp-2 break-words">
            {venue.name}
          </h1>
          <div className="flex items-center mx-2 text-lg gap-4 mb-6">
            <address className="flex items-center not-italic">
              <img
                src={
                  isDarkMode ? assets.location_icon_white : assets.location_icon
                }
                alt="Location Icon"
                className="size-5"
              />
              {venue.location.city}, {venue.location.country}
            </address>
            {venue.rating > 0 && (
              <div className="flex items-center">
                <img
                  src={assets.star_icon}
                  alt="Star Icon"
                  className="w-4 h-4"
                />
                <span aria-label={`Rating: ${venue.rating} stars`}>
                  {venue.rating}
                </span>
              </div>
            )}
            <ReserveButton
              className="ml-auto"
              onClick={() => {
                document
                  .getElementById("booking-heading")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        </header>

        <section aria-label="Venue images and location">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Image Carousel */}
            <div className="w-full mx-auto px-2">
              <ImageCarousel
                images={venue.media}
                isDarkMode={isDarkMode}
                assets={assets}
              />
            </div>

            {/* Leaflet Map */}
            <div className="mx-2">
              <LocationMap
                lat={venue.location.lat ?? -50.6042}
                lng={venue.location.lng ?? 165.973}
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="about-heading">
          <div className="my-6 mx-2">
            <h2 id="about-heading" className="text-xl font-semibold mb-4">
              About this venue
            </h2>
            <p>{venue.description}</p>

            <div className="my-6">
              <h3 className="text-xl font-semibold mb-2">Capacity</h3>
              <p>Maximum {venue.maxGuests} guests</p>
            </div>
          </div>
        </section>

        <section aria-label="Venue details">
          <div className="my-6 mx-2 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl flex items-baseline gap-2 font-semibold mb-2">
                <img
                  src={
                    isDarkMode
                      ? assets.location_icon_white
                      : assets.location_icon
                  }
                  alt="Location icon"
                  className="size-5"
                />
                Location
              </h3>
              <address className="not-italic">
                <p className="mb-1">{venue.location.address}</p>
                <p className="mb-1">
                  {venue.location.city}, {venue.location.zip}
                </p>
                <p className="mb-4">
                  {venue.location.country}, {venue.location.continent}
                </p>
              </address>
            </div>

            {/* Features */}
            <VenueFeatures
              meta={venue.meta}
              isDarkMode={isDarkMode}
              assets={assets}
            />
          </div>
        </section>

        <section
          id="booking-section"
          aria-labelledby="booking-heading"
          className="w-full h-auto sm:p-2 bg-linear-to-b from-20% from-primary/70 to-70% to-secondary py-5"
        >
          <h2
            id="booking-heading"
            className="text-2xl sm:text-3xl font-medium text-text text-center my-4 mb-10 scroll-mt-32"
          >
            Booking
          </h2>
          <BookingCalendar
            venueId={venue.id}
            maxGuests={venue.maxGuests}
            price={venue.price}
            existingBookings={venue.bookings}
          />
        </section>

        <div className="text-sm p-2 text-text mt-8">
          <p>Venue ID: {venue.id}</p>
          <p>
            Added:{" "}
            <time dateTime={venue.created}>{formatDate(venue.created)}</time>
          </p>
          <p>
            Last updated:{" "}
            <time dateTime={venue.updated}>{formatDate(venue.updated)}</time>
          </p>
        </div>
      </div>
    </article>
  );
};

export default VenueDetail;
