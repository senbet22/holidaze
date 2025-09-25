import { assets } from "../../assets/assets.mjs";
import { useDarkMode } from "../../hooks/useDarkMode";

const AddVenueCard = ({ onClick }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex="0"
      onClick={onClick}
      onKeyDown={handleKeyPress}
      aria-label="Add a new venue"
      className="flex relative bg-secondary shadow-sm hover:shadow-text shadow-text/30 flex-col w-full rounded-xl overflow-hidden cursor-pointer border-2 border-dashed border-text hover:border-blue-400 transition-all duration-200 outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="flex-1 flex items-center justify-center h-88 sm:h-56">
        <div className="text-center">
          <div className="m-4">
            <div className="size-14 bg-primary text-[#040605] rounded mx-auto flex items-center justify-center text-5xl font-bold">
              +
            </div>
          </div>
          <h2 className="text-lg font-semibold text-text mb-2">
            List Your Stay
          </h2>
          <p className="text-sm text-text">Click here to add new Venue</p>
        </div>
      </div>
    </div>
  );
};

const ManagerVenueCard = ({ venue, onEdit, onDelete }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex relative bg-background shadow-sm hover:shadow-text shadow-text/30 flex-col w-full rounded-xl overflow-hidden">
      <div className="relative">
        <div className="w-full h-full aspect-video  bg-gray-200 flex items-center justify-center overflow-hidden">
          {venue.media?.[0]?.url ? (
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt || ""}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = assets.no_image_found;
                e.currentTarget.onerror = null;
              }}
            />
          ) : (
            <span className="text-gray-400">Venue Image</span>
          )}
        </div>
      </div>

      <div className="flex text-text flex-col justify-between p-2 h-full">
        <h3 className="text-base  mb-0  font-semibold p-1 line-clamp-2   ">
          {venue.name}
        </h3>
        <div className="flex justify-between">
          <p className="text-lg font-medium text-accent">
            ${venue.price}/night
          </p>
          {venue.rating > 0 ? (
            <p className="flex mx-2 text-lg">
              <img
                src={assets.star_icon}
                alt="star icon"
                className="w-5 h-7 mx-1"
              />
              {venue.rating}
            </p>
          ) : (
            <p className="flex text-lg text-text">
              <img src={assets.stars_icon} alt="New icon" className="w-5 h-7" />
              New
            </p>
          )}
        </div>
        <div>
          <p className="flex truncate mt-2  text-text">
            <img
              src={
                isDarkMode ? assets.location_icon_white : assets.location_icon
              }
              className="w-5 h-6 mr-1"
              alt="Location Icon"
            />
            {venue.location?.city}, {venue.location?.country}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onEdit(venue)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-text bg-secondary hover:bg-primary rounded-lg cursor-pointer  transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(venue)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-[#0b1d2b] bg-red-300 hover:bg-red-400 rounded-lg cursor-pointer  transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ManagerVenueGrid = ({
  venues = [],
  onAddVenue,
  onEditVenue,
  onDeleteVenue,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      <AddVenueCard onClick={onAddVenue} />

      {venues.map((venue) => (
        <ManagerVenueCard
          key={venue.id}
          venue={venue}
          onEdit={onEditVenue}
          onDelete={onDeleteVenue}
        />
      ))}
    </div>
  );
};

export default ManagerVenueGrid;
