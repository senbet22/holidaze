import { assets } from "../assets/assets.mjs";
import ProfileCard from "../components/profile/ProfileCard";
import UpcomingBookingsCard from "../components/profile/UpcomingBookingsCard";

/**
 * Profile page component.
 *
 * Shows user profile details and upcoming bookings.
 *
 * @returns {JSX.Element}
 */

const Profile = () => {
  return (
    <>
      <div className="min-h-screen bg-background mt-20 px-4">
        <div className="max-w-6xl mx-auto py-20">
          <header className="mb-8">
            <h1 className="flex text-xl sm:text-2xl font-medium text-text">
              Your upcoming adventures await{" "}
              <img src={assets.stars_icon} alt="Star Icon" />
            </h1>
          </header>

          {/* Profile Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <aside
              className="lg:col-span-1"
              aria-label="User profile information"
            >
              <ProfileCard />
            </aside>

            {/* Upcoming booking section */}
            <section
              className="lg:col-span-2"
              aria-labelledby="bookings-heading"
            >
              <h2 id="bookings-heading" className="sr-only">
                Upcoming Bookings
              </h2>
              <UpcomingBookingsCard />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
