import ProfileCard from "../components/profile/ProfileCard";
import UpcomingBookingsCard from "../components/profile/UpcomingBookingsCard";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background p-2">
      <div className="max-w-6xl mx-auto mt-25">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-text">
            Your upcoming adventures await ✨
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>

          <div className="lg:col-span-2">
            <UpcomingBookingsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
