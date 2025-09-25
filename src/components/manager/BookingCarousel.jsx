import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import UpcomingBookingsCard from "../manager/ConfirmedBookings";
import { assets } from "../../assets/assets.mjs";
import { useDarkMode } from "../../hooks/useDarkMode";

/**
 * BookingCarousel component.
 *
 * Displays bookings in a horizontal scrollable carousel with navigation arrows.
 * Uses Embla carousel for smooth scrolling and supports keyboard navigation.
 *
 * @component
 * @param {Array} bookings - Array of booking objects to display
 * @param {Object} venue - Venue object passed to each booking card
 * @returns {JSX.Element} Carousel with booking cards and navigation controls
 */

const BookingCarousel = ({ bookings, venue }) => {
  const { isDarkMode } = useDarkMode();

  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    skipSnaps: false,
    draggable: true,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="relative bg-secondary/20 px-2 rounded-lg">
      {/* Arrows */}
      {canScrollPrev && (
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/70 hover:bg-secondary cursor-pointer text-text rounded-full p-2 shadow-md"
          aria-label="Scroll previous bookings"
        >
          <img
            src={isDarkMode ? assets.dropdown_icon_white : assets.dropdown_icon}
            className="rotate-90"
            alt="Previous Button"
          />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/70 hover:bg-secondary cursor-pointer text-text rounded-full p-2 shadow-md"
          aria-label="Scroll next bookings"
        >
          <img
            src={isDarkMode ? assets.dropdown_icon_white : assets.dropdown_icon}
            className="-rotate-90"
            alt="Next Button"
          />
        </button>
      )}

      {/* Carousel */}
      <div className="overflow-hidden py-2" ref={emblaRef}>
        <div className="flex gap-4">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="flex-shrink-0 outline-none focus:ring-2 focus:ring-primary rounded"
              tabIndex="0"
              aria-labelledby={`booking-${booking.id}-title`}
            >
              <UpcomingBookingsCard
                booking={booking}
                venue={venue}
                id={`booking-${booking.id}-title`}
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCarousel;
