import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.mjs";
import { getProfileBookings } from "../../API/profileService.mjs";
import { getToday } from "../../utils/todayDate.mjs";
import { formatDate } from "../../utils/formatDate.mjs";
import { useDarkMode } from "../../hooks/useDarkMode";

const UpcomingBookingsCard = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getProfileBookings();

        const flattened = data
          .map((booking) => {
            const venue = booking.venue || {};
            return {
              id: booking.id,
              venueId: venue.id, // Add venue ID for navigation
              name: venue.name || "No venue name",
              location: venue.location || {},
              media: venue.media || [],
              price: venue.price || 0,
              rating: venue.rating || 0,
              dateFrom: booking.dateFrom || booking.created,
              dateTo: booking.dateTo || booking.updated,
            };
          })
          .filter((b) => new Date(b.dateFrom) >= getToday());

        setBookings(flattened);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCardClick = (venueId) => {
    if (venueId) {
      navigate(`/venue/${venueId}`);
    }
  };

  return (
    <div className="rounded-lg min-h-52">
      <div className="mb-4 relative inline-block">
        <h2 className="text-xl font-semibold text-text mb-1">
          Upcoming bookings
        </h2>
        <hr className="h-3 border-0 bg-primary rounded-br-2xl w-full" />
      </div>

      {loading && <p className="text-text/70">Loading bookings...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && bookings.length === 0 && (
        <div className="mb-25">
          <img src={assets.no_upcoming_booking} alt="No upcoming bookings" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map((booking) => (
          <article
            key={booking.id}
            tabIndex="0"
            aria-labelledby={`booking-${booking.id}-title`}
            className="bg-background rounded-lg shadow-sm overflow-hidden shadow-text/30 hover:shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            onClick={() => handleCardClick(booking.venueId)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardClick(booking.venueId);
              }
            }}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={booking.media?.[0]?.url || assets.no_upcoming_booking}
                alt={booking.media?.[0]?.alt || booking.name}
                onError={(e) => {
                  e.currentTarget.src = assets.no_image_found;
                  e.currentTarget.onerror = null;
                }}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="px-4 flex text-text justify-between">
              <h3
                id={`booking-${booking.id}-title`}
                className="line-clamp-2 text-base sm:text-lg font-semibold"
              >
                {booking.name}
              </h3>
              {booking.rating > 0 ? (
                <p className="flex mx-2 text-lg">
                  <img
                    src={assets.star_icon}
                    alt="star icon"
                    className="w-5 h-7 mx-1"
                  />
                  {booking.rating}
                </p>
              ) : (
                <p className="flex text-lg text-text">
                  <img
                    src={assets.stars_icon}
                    alt="New icon"
                    className="w-5 h-7"
                  />
                  New
                </p>
              )}
            </div>

            <div className="p-4 flex justify-between">
              {/* Price + Location */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-accent">
                  ${booking.price}/night
                </p>
                <div className="flex items-center gap-1 text-text/70">
                  <img
                    src={
                      isDarkMode
                        ? assets.location_icon_white
                        : assets.location_icon
                    }
                    className="size-5"
                    alt="Location icon"
                  />
                  <span className="text-sm line-clamp-2">
                    {booking.location?.city}, {booking.location?.country}
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="flex flex-col text-right text-sm font-medium text-accent gap-1">
                <span>From: {formatDate(booking.dateFrom)}</span>
                <span>To: {formatDate(booking.dateTo)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookingsCard;
