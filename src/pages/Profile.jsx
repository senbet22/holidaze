import ProfileCard from "../components/profile/ProfileCard";
import UpcomingBookingsCard from "../components/profile/UpcomingBookingsCard";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto my-20">
        <header className="mb-8">
          <h1 className="text-2xl font-medium text-text">
            Your upcoming adventures await ✨
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside
            className="lg:col-span-1"
            aria-label="User profile information"
          >
            <ProfileCard />
          </aside>

          <section className="lg:col-span-2" aria-labelledby="bookings-heading">
            <h2 id="bookings-heading" className="sr-only">
              Upcoming Bookings
            </h2>
            <UpcomingBookingsCard />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
