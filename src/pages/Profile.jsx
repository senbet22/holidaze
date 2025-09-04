import { useEffect, useState } from "react";
import { assets } from "../assets/assets.mjs";
import { getProfileBookings } from "../API/profileService.mjs";
import { getToday } from "../utils/todayDate.mjs";
import ProfileCard from "../components/profile/ProfileCard";
import { formatDate } from "../utils/formatDate.mjs";
const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const profile = {
    name: "Senbet",
    email: "senbet22@stud.noroff.no",
    role: "Manager",
    bio: "Hello I am venue manager trying to manage some venues",
    bookings: bookings.length,
    venues: 2,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getProfileBookings();

        // Map each booking to include venue info and dates
        const flattened = data
          .map((booking) => {
            const venue = booking.venue || {};
            return {
              id: booking.id,
              name: venue.name || "No venue name",
              location: venue.location || {},
              media: venue.media || [],
              price: venue.price || 0,
              rating: venue.rating || 0,
              dateFrom: booking.dateFrom || booking.created,
              dateTo: booking.dateTo || booking.updated,
            };
          })
          // Filter only upcoming bookings
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

  return (
    <div className="min-h-screen bg-background p-2 ">
      <div className="max-w-6xl mx-auto mt-25">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-medium text-text">
              Your upcoming adventures await ✨
            </h1>
          </div>
          <button className="bg-primary text-text px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Manage my Venue's
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="mb-4 relative inline-block">
              <h2 className="text-xl font-semibold text-text mb-1">Profile</h2>
              <hr className="h-3 border-0 bg-primary rounded-br-2xl w-full" />
            </div>

            {/* Reusable ProfileCard */}
            <ProfileCard profile={profile} />
          </div>

          {/* Upcoming Bookings Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 relative inline-block">
              <h2 className="text-xl font-semibold text-text mb-1">
                Upcoming bookings
              </h2>
              <hr className="h-3 border-0 bg-primary rounded-br-2xl w-full" />
            </div>

            {loading && <p className="text-text/70">Loading bookings...</p>}
            {error && (
              <p className="text-red-500">Error loading bookings: {error}</p>
            )}

            {!loading && !error && bookings.length === 0 && (
              <p className="text-text/70">No upcoming bookings found.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-background rounded-lg shadow-sm overflow-hidden shadow-text/30 hover:shadow-sm transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={booking.media?.[0]?.url || assets.no_image_found}
                      alt={booking.media?.[0]?.alt || booking.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4  flex text-text justify-between">
                    <p className="truncate  text-lg sm:text-xl ">
                      {booking.name}
                    </p>
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
                      <p className="flex mx-2 text-lg text-primary">✨New</p>
                    )}
                  </div>

                  <div className="p-4 flex justify-between">
                    {/* Left column: price + location */}
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-accent">
                        ${booking.price}/night
                      </p>
                      <div className="flex items-center gap-1 text-text/70">
                        <img
                          src={assets.location_icon}
                          className="size-5"
                          alt=""
                        />
                        <span className="text-sm truncate">
                          {booking.location?.city}, {booking.location?.country}
                        </span>
                      </div>
                    </div>

                    {/* Right column: booking dates */}
                    <div className="flex flex-col text-right text-sm font-medium text-accent gap-1">
                      <span>From: {formatDate(booking.dateFrom)}</span>
                      <span>To: {formatDate(booking.dateTo)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
