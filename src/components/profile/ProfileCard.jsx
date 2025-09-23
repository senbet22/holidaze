import { useEffect, useState } from "react";
import { updateProfile } from "../../API/profileService.mjs";
import { assets } from "../../assets/assets.mjs";
import { useDarkMode } from "../../hooks/useDarkMode";
import FocusLock from "react-focus-lock";

const ProfileCard = () => {
  const { isDarkMode } = useDarkMode();

  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarAlt, setAvatarAlt] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedProfile = sessionStorage.getItem("DunestayProfile");
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfile({
          ...parsed,
          role: parsed.venueManager ? "Manager" : "User",
          avatar: parsed.avatar?.url,
          venueCount: parsed.venues?.length || 0,
        });
        setBio(parsed.bio || "");
        setAvatarUrl(parsed.avatar?.url || "");
        setAvatarAlt(parsed.avatar?.alt || "");
      }
    } catch (err) {
      console.error("Error reading profile from sessionStorage:", err);
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const updated = await updateProfile({
        bio,
        avatar: {
          url: avatarUrl,
          alt: avatarAlt,
        },
      });

      setProfile((prev) => ({
        ...prev,
        bio: updated.bio,
        avatar: updated.avatar?.url,
      }));

      sessionStorage.setItem("DunestayProfile", JSON.stringify(updated));
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="bg-secondary rounded-lg p-6 text-text">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-lg p-4 min-h-52 relative">
      <title>{profile.name}</title>
      <button
        className="absolute top-0 right-0 cursor-pointer bg-primary text-[#0b1d2b] px-4 py-2 rounded text-base hover:bg-primary/90 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Profile
      </button>

      <div className="flex items-start gap-4 my-6">
        <img
          src={profile.avatar}
          alt="Profile Picture"
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="truncate">
          <strong className="font-semibold sm:text-lg text-text truncate">
            {profile.name}
          </strong>
          <p className="text-text/70 text-sm truncate">{profile.email}</p>
          <p className="text-text/80 text-sm mt-1">{profile.role}</p>
        </div>
      </div>

      <p className="text-text text-sm leading-relaxed">{profile.bio}</p>

      {/* Modal */}
      <FocusLock>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-secondary rounded-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-text text-lg font-bold"
                onClick={() => setIsModalOpen(false)}
              >
                <img
                  src={isDarkMode ? assets.cross_icon_white : assets.cross_icon}
                  className="size-6 cursor-pointer"
                  alt="Close Icon"
                />
              </button>

              <h3 className="text-lg font-semibold mb-4 text-text">
                Edit Profile
              </h3>

              <div className="mb-4">
                <label className="block text-text mb-1">Bio</label>
                <textarea
                  value={bio}
                  rows={3}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 bg-background text-text"
                />
              </div>

              <div className="mb-4">
                <label className="block text-text mb-1">Avatar URL</label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 bg-background text-text"
                />
              </div>

              <div className="mb-4">
                <label className="block text-text mb-1">Avatar Alt</label>
                <input
                  type="text"
                  value={avatarAlt}
                  onChange={(e) => setAvatarAlt(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 bg-background text-text"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-primary text-text cursor-pointer px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </FocusLock>
    </div>
  );
};

export default ProfileCard;
