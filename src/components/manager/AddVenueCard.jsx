import { assets } from "../../assets/assets.mjs";
import { useDarkMode } from "../../hooks/useDarkMode";

const AddVenueCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex relative bg-secondary shadow-sm hover:shadow-text shadow-text/30 flex-col w-full rounded-xl overflow-hidden cursor-pointer border-2 border-dashed border-text hover:border-blue-400 transition-all duration-200"
    >
      <div className="flex-1 flex items-center justify-center h-88 sm:h-56">
        <div className="text-center">
          <div className="mb-4">
            <div className="size-14 bg-primary text-[#040605] rounded mx-auto flex items-center justify-center  text-5xl font-bold">
              +
            </div>
          </div>
          <h3 className="text-lg font-semibold text-text mb-2">
            List Your Stay
          </h3>
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
              alt={venue.media[0].alt || venue.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Venue Image</span>
          )}
        </div>
      </div>

      <div className="flex text-text flex-col justify-between p-2 h-full">
        <h2
          className="text-base  mb-0  font-semibold p-1 line-clamp-2   "
          title={venue.name}
        >
          {venue.name}
        </h2>
        <div className="flex justify-between">
          <p className="text-lg font-medium text-accent">
            ${venue.price}/night
          </p>
          <p className="flex mx-2 text-lg ">
            <img src={assets.star_icon} alt="" className="w-5 h-7 mx-1" />
            {venue.rating || 0}
          </p>
        </div>
        <div>
          <p className="flex truncate mt-2  text-text">
            <img
              src={
                isDarkMode ? assets.location_icon_white : assets.location_icon
              }
              className="w-5 h-6 mr-1"
              alt=""
            />
            {venue.location?.city}, {venue.location?.country}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onEdit(venue)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-text bg-primary/50 hover:bg-secondary rounded-lg cursor-pointer  transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(venue)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-text bg-red-800/30 hover:bg-red-800/50 rounded-lg cursor-pointer  transition-colors"
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
