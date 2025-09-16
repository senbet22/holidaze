const VenueDetailSkeleton = () => {
  return (
    <div className="bg-background animate-pulse">
      <div className="max-w-6xl mx-auto pt-25 bg-background text-text shadow-sm">
        {/* Title skeleton */}
        <div className="h-7 bg-accent/30 rounded-lg mb-4 mx-2 mt-12 w-3/4"></div>

        {/* Location, rating, and button row */}
        <div className="flex items-center mx-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-accent/30 rounded"></div>
            <div className="h-5 bg-accent/30 rounded w-32"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent/30 rounded"></div>
            <div className="h-5 bg-accent/30 rounded w-8"></div>
          </div>
          <div className="ml-auto h-10 bg-accent/30 rounded-lg w-24"></div>
        </div>

        {/* Image carousel and map grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Image carousel skeleton */}
          <div className="w-full mx-auto px-2">
            <div className="relative rounded-lg overflow-hidden">
              <div className="h-96 bg-accent/30 rounded-lg"></div>
              {/* Navigation arrows skeleton */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent/50 rounded-full"></div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-accent/50 rounded-full"></div>
            </div>
          </div>

          {/* Map skeleton */}
          <div className="mx-2">
            <div className="h-96 bg-accent/30 rounded-lg"></div>
          </div>
        </div>

        {/* About section skeleton */}
        <div className="my-6 mx-2">
          <div className="h-6 bg-accent/30 rounded mb-4 w-48"></div>
          <div className="space-y-2">
            <div className="h-4 bg-accent/20 rounded w-full"></div>
            <div className="h-4 bg-accent/20 rounded w-5/6"></div>
            <div className="h-4 bg-accent/20 rounded w-4/6"></div>
          </div>

          {/* Capacity section */}
          <div className="my-6">
            <div className="h-6 bg-accent/30 rounded mb-2 w-24"></div>
            <div className="h-4 bg-accent/20 rounded w-40"></div>
          </div>
        </div>

        {/* Location and Features grid */}
        <div className="my-6 mx-2 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Location section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-accent/30 rounded"></div>
              <div className="h-6 bg-accent/30 rounded w-20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-accent/20 rounded w-3/4"></div>
              <div className="h-4 bg-accent/20 rounded w-2/3"></div>
              <div className="h-4 bg-accent/20 rounded w-1/2"></div>
            </div>
          </div>

          {/* Features section */}
          <div>
            <div className="h-6 bg-accent/30 rounded mb-4 w-24"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-accent/30 rounded"></div>
                <div className="h-4 bg-accent/20 rounded w-16"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-accent/30 rounded"></div>
                <div className="h-4 bg-accent/20 rounded w-12"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-accent/30 rounded"></div>
                <div className="h-4 bg-accent/20 rounded w-14"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-accent/30 rounded"></div>
                <div className="h-4 bg-accent/20 rounded w-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking section skeleton */}
        <div className="w-full h-auto sm:p-2 bg-accent/20 py-5">
          <div className="h-8 bg-accent/30 rounded mb-10 mx-auto w-32"></div>

          {/* Calendar skeleton */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-accent/10 rounded-lg p-6">
              {/* Calendar header */}
              <div className="flex justify-between items-center mb-6">
                <div className="h-6 bg-accent/30 rounded w-32"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-accent/30 rounded"></div>
                  <div className="w-8 h-8 bg-accent/30 rounded"></div>
                </div>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="h-10 bg-accent/20 rounded"></div>
                ))}
              </div>

              {/* Booking form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="h-12 bg-accent/30 rounded"></div>
                <div className="h-12 bg-accent/30 rounded"></div>
                <div className="h-12 bg-accent/30 rounded"></div>
              </div>

              <div className="mt-4 h-12 bg-primary/30 rounded-lg w-full"></div>
            </div>
          </div>
        </div>

        {/* Footer info skeleton */}
        <div className="text-sm p-2 mt-8 space-y-1">
          <div className="h-3 bg-accent/20 rounded w-32"></div>
          <div className="h-3 bg-accent/20 rounded w-40"></div>
          <div className="h-3 bg-accent/20 rounded w-36"></div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailSkeleton;
