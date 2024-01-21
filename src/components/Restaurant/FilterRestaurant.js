import React, { useState } from "react";

const FilterRestaurant = ({
  filterOptions,
  handleFilter,
  handleSearch,
  handleSearchClick,
  searchText,
  listOfRes,
  setFilteredRes,
}) => {
  const uniqueCuisines = Array.from(
    new Set((listOfRes || []).flatMap((res) => res.info.cuisines || []))
  );
  const [isActive, setIsActive] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const handleCuisineButtonClick = () => {
    setIsActive(!isActive);
    setSelectedCuisine(null);
    setFilteredRes(listOfRes);
    handleFilter("cuisines", null);
  };

  const handleCuisineSelection = (cuisine) => {
    setIsActive(!isActive);
    setSelectedCuisine(cuisine);
    setFilteredRes(
      cuisine
        ? listOfRes.filter((res) => res.info.cuisines.includes(cuisine))
        : listOfRes
    );
    handleFilter("cuisines", cuisine);
  };

  return (
    <div className=" mt-6 sm:mt-8 lg:mt-12 flex flex-col sm:flex-row sm:justify-between md:items-center my-2 md:my-4 space-y-2 sm:space-y-0">
      <div className="flex flex-row ">
        <input
          type="text"
          className="mb-2 sm:mb-0 px-2 py-1 outline-none bg-teal-100 rounded-l-2xl border-2 border-dashed border-slate-800 shadow-md border-r-0 w-full sm:w-auto"
          placeholder="Search Restaurants..."
          value={searchText}
          onChange={handleSearch}
        />
        <button
          className="mb-2 sm:mb-0 px-4 py-1 cursor-pointer bg-teal-500 text-white rounded-r-2xl border-2 border-dashed border-slate-800 shadow-md  "
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <div className="lg:space-x-6   md:flex ">
        <button
          className={`md:py-2 lg:px-4 py-1 px-2 rounded-full border-2 border-solid mb-2 md:mb-0 ${
            filterOptions.topRated
              ? "bg-teal-500 text-white"
              : "bg-white text-teal-500"
          }`}
          onClick={() => handleFilter("topRated")}
        >
          Top Rated
        </button>
        <button
          className={`md:py-2 lg:px-4 py-1 px-2 rounded-full border-2 border-solid mb-2 md:mb-0 ${
            filterOptions.lowerToHigherPrice
              ? "bg-teal-500 text-white"
              : "bg-white text-teal-500"
          }`}
          onClick={() => handleFilter("lowerToHigherPrice")}
        >
          Low to High ₹
        </button>
        <button
          className={`md:py-2 lg:px-4 py-1 px-2 rounded-full border-2 border-solid mb-2 md:mb-0 ${
            filterOptions.higherToLowerPrice
              ? "bg-teal-500 text-white"
              : "bg-white text-teal-500"
          }`}
          onClick={() => handleFilter("higherToLowerPrice")}
        >
          High to Low ₹
        </button>
        <button
          className={`md:py-2 lg:px-4 py-1 px-2 rounded-full border-2 border-solid mb-2 md:mb-0 ${
            filterOptions.lowestDeliveryTime
              ? "bg-teal-500 text-white"
              : "bg-white text-teal-500"
          }`}
          onClick={() => handleFilter("lowestDeliveryTime")}
        >
          Fast Delivery
        </button>
        <div className="relative inline-block text-left mt-3 md:mt-0">
          <button
            type="button"
            className={`md:py-2 md:px-4 py-1 px-2 rounded-full border-2 border-solid mb-2 md:mb-0 ${
              filterOptions.cuisines || selectedCuisine === "Cusines"
                ? "bg-teal-500 text-white"
                : "bg-white text-teal-500"
            }`}
            onClick={handleCuisineButtonClick}
          >
            {selectedCuisine ? selectedCuisine + " X" : "Cuisines"}
          </button>
          {isActive && (
            <div className="menu z-20 origin-top-right absolute mt-2 w-36 max-h-44  rounded-2xl shadow-lg overflow-y-scroll bg-white ring-1 ring-black ring-opacity-5    border-2 border-teal-500 md:-ml-16 bg-opacity-90">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {uniqueCuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    className={`w-full block px-4 py-2 text-sm text-gray-700 hover:bg-teal-200 hover:text-gray-900 border-b-2 border-dashed border-amber-500 ${
                      selectedCuisine === cuisine
                        ? "bg-teal-500 text-white"
                        : ""
                    }`}
                    role="menuitem"
                    onClick={() => handleCuisineSelection(cuisine)}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterRestaurant;
