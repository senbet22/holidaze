import { useState } from "react";
import { assets } from "../assets/assets.mjs";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="max-w-6xl bg-secondary shadow-sm w-full mx-auto rounded-sm mt-5 mb-15 py-3">
      <div className="flex-col w-full items-center">
        <h2 className="text-2xl font-medium text-accent text-center my-4">
          Hey Senbet! Where would you like to stay?
        </h2>

        {/* Search Input */}
        <div className="relative w-full mb-6 mx-auto md:px-10 flex">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for a venue..."
              value={query}
              onChange={handleChange}
              className="bg-white border border-gray-300 text-[#0b1d2b] text-lg p-3 pl-12 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
            <img
              className="absolute left-4 size-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              src={assets.search_icon_black}
              alt="Search Icon"
            />
          </div>
          <button
            className="bg-primary  text-background cursor-pointer px-6 py-2 rounded-r-lg transition-colors duration-200"
            onClick={handleSearch}
          >
            <img
              className="size-8 hover:scale-110 ease-in-out"
              src={assets.search_icon}
              alt="Search Button"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
