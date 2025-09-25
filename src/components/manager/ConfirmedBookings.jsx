import { assets } from "../../assets/assets.mjs";

/**
 * ConfirmedBookings component.
 *
 * Displays a booking card with venue image, guest details, dates, and total cost.
 * Shows "Confirmed" status badge and handles missing venue images with fallback.
 *
 * @component
 * @param {Object} booking - Booking object with dateFrom, dateTo, guests, and customer details
 * @param {Object} venue - Venue object with media, name, and price
 * @returns {JSX.Element|null} Booking card or null if no booking provided
 */

const ConfirmedBookings = ({ booking, venue }) => {
  if (!booking) return null;

  const dateFrom = new Date(booking.dateFrom).toLocaleDateString();
  const dateTo = new Date(booking.dateTo).toLocaleDateString();

  const nights =
    (new Date(booking.dateTo) - new Date(booking.dateFrom)) /
    (1000 * 60 * 60 * 24);

  return (
    <div className="flex relative bg-background shadow-sm hover:shadow-text shadow-text/30 flex-col min-w-[16rem] rounded-xl overflow-hidden">
      {/* Status Badge */}
      <div className="absolute top-2 right-2 z-10">
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Confirmed
        </span>
      </div>

      {/* Venue Image */}
      <div className="relative h-32 bg-gray-200 flex items-center justify-center overflow-hidden">
        {venue.media?.[0]?.url ? (
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt || venue.name}
            onError={(e) => {
              e.currentTarget.src = assets.no_image_found;
              e.currentTarget.onerror = null;
            }}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Venue Image</span>
        )}
      </div>

      <div className="flex text-text flex-col p-4 space-y-2">
        {/* Guest Info */}
        <div className="flex items-center text-sm text-text">
          <span>
            {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
          </span>
        </div>

        {/* Dates */}
        <div className="text-sm text-text/70">
          From: {dateFrom} - {dateTo}
        </div>

        {/* Booking Details */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center mb-1">
            <p className="text-text text-lg font-medium">
              Total: ${venue.price * nights}
            </p>

            <span className="text-sm text-accent">{nights} nights</span>
          </div>
          <p className="text-sm text-text truncate">
            Guest: {booking.customer?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedBookings;
