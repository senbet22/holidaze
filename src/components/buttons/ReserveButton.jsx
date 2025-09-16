const ReserveButton = ({ onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-primary/80 text-[#f9fbfa] py-2 px-4 rounded-md 
        font-medium hover:bg-primary transition-colors cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-primary/50
        disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm shadow-gray-700
        ${className || ""}
      `}
    >
      Reserve
    </button>
  );
};

export default ReserveButton;
