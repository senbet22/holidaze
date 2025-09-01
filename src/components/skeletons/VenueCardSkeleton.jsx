const VenueCardSkeleton = () => {
  return (
    <div className="flex relative bg-background shadow-sm shadow-text/30 flex-col w-full rounded-xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-88 sm:h-56 bg-secondary" />

      <div className="flex flex-col justify-between p-2 mt-auto space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-300 rounded w-3/4" />

        {/* Price + Rating */}
        <div className="flex justify-between items-center">
          <div className="h-5 bg-accent rounded w-1/3" />
          <div className="h-5 bg-primary rounded w-12" />
        </div>

        {/* Location */}
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
};

export default VenueCardSkeleton;
