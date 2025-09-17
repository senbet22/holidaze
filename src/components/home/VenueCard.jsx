import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.mjs";
import { useDarkMode } from "../../hooks/useDarkMode";

const VenueCard = ({ venue }) => {
  const { isDarkMode } = useDarkMode();
  const currencySymbol = "$";

  return (
    <Link
      to={`/venue/${venue.id}`}
      className="flex relative bg-background shadow-sm hover:shadow-text shadow-text/30 flex-col w-full rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <img
        className="object-cover w-full h-88 sm:h-56"
        src={
          venue.media?.length > 0 ? venue.media[0].url : assets.no_image_found
        }
        alt={venue.media?.length > 0 ? venue.media[0].alt : "No venue image"}
        onError={(e) => {
          e.currentTarget.src = assets.no_image_found;
          e.currentTarget.onerror = null;
        }}
      />

      <div className="flex text-text flex-col justify-between p-2 mt-auto">
        <h2 className="text-lg mb-0 font-semibold p-1 truncate">
          {venue.name}
        </h2>

        <div className="flex justify-between">
          <p className="text-lg font-medium text-accent">
            {currencySymbol}
            {venue.price}/night
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
            <p className="flex mx-2 text-lg text-primary">✨New</p>
          )}
        </div>

        <div>
          <p className="flex truncate mt-2 text-text">
            <img
              src={
                isDarkMode ? assets.location_icon_white : assets.location_icon
              }
              alt="Location icon"
              className="w-5 h-6 mr-1"
            />
            {venue.location.city}, {venue.location.country}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
