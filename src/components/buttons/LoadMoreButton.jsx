/**
 * Button to load more items with loading and availability states.
 *
 * @param {Object} props
 * @param {function} props.onClick - Callback when button is clicked.
 * @param {boolean} props.isLoading - Shows loading state when true.
 * @param {boolean} props.hasMore - If false, button is hidden.
 */

const LoadMoreButton = ({ onClick, isLoading, hasMore }) => {
  if (!hasMore) return null;

  return (
    <div className="w-full flex justify-center my-6">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="px-6 py-2 cursor-pointer bg-accent text-background rounded-md hover:text-text hover:bg-primary/90 disabled:bg-gray-400"
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
