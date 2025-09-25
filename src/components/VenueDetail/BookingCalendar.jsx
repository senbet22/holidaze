import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { createBooking } from "../../API/bookingService.mjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * BookingCalendar component.
 *
 * Displays a date range picker and guest selector for booking a venue,
 * validates input against existing bookings, calculates total price,
 * and submits booking via API.
 *
 * @param {Object} props
 * @param {string} props.venueId - ID of the venue being booked.
 * @param {number} props.maxGuests - Maximum number of guests allowed.
 * @param {number} props.price - Price per night for the venue.
 * @param {Array<Object>} [props.existingBookings=[]] - Array of existing bookings for the venue.
 * @returns {JSX.Element}
 */

function BookingCalendar({ venueId, maxGuests, price, existingBookings = [] }) {
  const [range, setRange] = useState();
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  const today = new Date();

  const navigate = useNavigate();

  useEffect(() => {
    const disabled = [];

    existingBookings.forEach((booking) => {
      const from = new Date(booking.dateFrom);
      const to = new Date(booking.dateTo);

      for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
        disabled.push(new Date(d));
      }
    });

    setBookedDates(disabled);
  }, [existingBookings]);

  const handleCreateBooking = async () => {
    if (!range || !range.from || !range.to) {
      setError("Please select both check-in and check-out dates");
      return;
    }

    if (guests < 1 || guests > maxGuests) {
      setError(`Number of guests must be between 1 and ${maxGuests}`);
      return;
    }

    const newFrom = range.from;
    const newTo = range.to;

    for (const booking of existingBookings) {
      const bookedFrom = new Date(booking.dateFrom);
      const bookedTo = new Date(booking.dateTo);

      if (newFrom < bookedTo && newTo > bookedFrom) {
        setError(
          "Selected dates overlap with an existing booking. Please choose different dates."
        );
        return; // Stop booking if overlap
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const bookingData = {
        dateFrom: newFrom.toISOString(),
        dateTo: newTo.toISOString(),
        guests: parseInt(guests),
        venueId: venueId,
      };

      const result = await createBooking(bookingData);
      setBookingResult(result.data);

      toast.success("Booking successful!");

      // Reset form
      setRange(undefined);
      setGuests(1);

      // Redirect to /profile after 2 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-background px-2 mx-auto  sm:mx-2 text-text font-medium  rounded-lg shadow-md w-fit">
      <p className=" text-xl py-4 text-accent">${price} Per Night</p>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        fromMonth={today}
        captionLayout="dropdown-buttons"
        disabled={[{ before: today }, ...bookedDates]}
        modifiers={{
          booked: bookedDates,
        }}
        modifiersStyles={{
          booked: {
            textDecoration: "line-through",
          },
        }}
      />

      <div className="mt-4">
        <label htmlFor="guest-count" className="block font-semibold text-text">
          No. of Guests (Max: {maxGuests})
        </label>
        <input
          id="guest-count"
          type="number"
          min="1"
          max={maxGuests}
          className="w-full border rounded p-2 mt-1 text-text"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
        />
      </div>

      {range && range.from && (
        <div className="mt-4 p-3 bg-background rounded text-text">
          <p className="font-semibold">Selected Dates:</p>
          <p>Check-in: {formatDate(range.from)}</p>
          {range.to && <p>Check-out: {formatDate(range.to)}</p>}
          <p>Guests: {guests}</p>
          {range.to && price && (
            <p className="font-semibold mt-2">
              Total: $
              {(
                price *
                Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24))
              ).toFixed(2)}
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {bookingResult && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="font-semibold">Booking Successful!</p>
          <p>Booking ID: {bookingResult.id}</p>
          <p>From: {new Date(bookingResult.dateFrom).toLocaleDateString()}</p>
          <p>To: {new Date(bookingResult.dateTo).toLocaleDateString()}</p>
          <p>Guests: {bookingResult.guests}</p>
        </div>
      )}

      <button
        onClick={handleCreateBooking}
        disabled={
          isLoading ||
          !range?.from ||
          !range?.to ||
          range.from.toDateString() === range.to.toDateString()
        }
        className={`w-full mt-4 my-3 py-3 px-4 rounded-lg font-semibold text-lg transition-colors ${
          isLoading ||
          !range?.from ||
          !range?.to ||
          range.from.toDateString() === range.to.toDateString()
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-accent text-white hover:bg-primary/80 cursor-pointer shadow-sm shadow-gray-700"
        }`}
      >
        {isLoading ? "Creating Booking..." : "Book Now"}
      </button>
    </div>
  );
}

export default BookingCalendar;
